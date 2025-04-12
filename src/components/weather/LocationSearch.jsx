import { useState } from 'react';
import { 
  TextField, 
  Autocomplete, 
  Box, 
  CircularProgress 
} from '@mui/material';
import { searchLocations } from '../../services/geocodingService';

const LocationSearch = ({ onLocationSelect }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = async (value) => {
    setInputValue(value);
    
    if (!value || value.length < 2) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const locations = await searchLocations(value);
      setOptions(locations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => 
        option.lat === value.lat && option.lon === value.lon
      }
      getOptionLabel={(option) => {
        const state = option.state ? `, ${option.state}` : '';
        const country = option.country ? `, ${option.country}` : '';
        return `${option.name}${state}${country}`;
      }}
      options={options}
      loading={loading}
      onInputChange={(_, value) => handleSearch(value)}
      onChange={(_, newValue) => {
        if (newValue) {
          onLocationSelect(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search location"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.name}
          {option.state && `, ${option.state}`}
          {option.country && `, ${option.country}`}
        </Box>
      )}
    />
  );
};

export default LocationSearch;