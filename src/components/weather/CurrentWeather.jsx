import { Card, CardContent, Box, Typography, Grid } from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  return (
    <Card elevation={3} sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 3 }}>
          Current Weather
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4
        }}>
          <Box sx={{ 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img 
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt={data.weather[0].description}
              style={{ width: '120px', height: '120px' }}
            />
            <Typography variant="h1" sx={{ mt: -2 }}>
              {Math.round(data.main.temp)}°F
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mt: 1 }}>
              {data.weather[0].description}
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            minWidth: { xs: '100%', md: '200px' }
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              <WaterDropIcon color="primary" />
              <Typography variant="h6">Humidity: {data.main.humidity}%</Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              <AirIcon color="primary" />
              <Typography variant="h6">Wind: {data.wind.speed} mph</Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              <DeviceThermostatIcon color="primary" />
              <Typography variant="h6">Feels like: {Math.round(data.main.feels_like)}°F</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;