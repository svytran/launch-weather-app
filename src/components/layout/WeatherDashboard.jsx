import { useState, useEffect } from 'react';
import { CircularProgress, Alert, Box } from '@mui/material';
import CurrentWeather from '../weather/CurrentWeather';
import HourlyForecast from '../weather/HourlyForecast';
import DailyForecast from '../weather/DailyForecast';
import LocationSearch from '../weather/LocationSearch';
import { 
  fetchCurrentWeather, 
  fetchHourlyForecast, 
  fetchDailyForecast 
} from '../../services/weatherService';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState({
    current: null,
    hourly: null,
    daily: null
  });
  const [loading, setLoading] = useState({
    current: true,
    hourly: true,
    daily: true
  });
  const [error, setError] = useState({
    current: null,
    hourly: null,
    daily: null
  });
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 40.7128,
    lon: -74.0060,
    name: 'New York'
  });

  const fetchWeatherData = async (lat, lon) => {
    setLoading({
      current: true,
      hourly: true,
      daily: true
    });
    setError({
      current: null,
      hourly: null,
      daily: null
    });

    try {
      const [current, hourly, daily] = await Promise.all([
        fetchCurrentWeather(lat, lon),
        fetchHourlyForecast(lat, lon),
        fetchDailyForecast(lat, lon)
      ]);
      
      setWeatherData({ current, hourly, daily });
    } catch (err) {
      setError(prev => ({ ...prev, weather: err.message }));
    } finally {
      setLoading({
        current: false,
        hourly: false,
        daily: false
      });
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedLocation.lat, selectedLocation.lon);
  }, [selectedLocation]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mb: 3 }}>
        <LocationSearch onLocationSelect={handleLocationSelect} />
      </Box>

      {loading.current ? (
        <CircularProgress />
      ) : error.current ? (
        <Alert severity="error">{error.current}</Alert>
      ) : (
        <CurrentWeather 
          data={weatherData.current} 
          locationName={selectedLocation.name}
        />
      )}

      {loading.hourly ? (
        <CircularProgress />
      ) : error.hourly ? (
        <Alert severity="error">{error.hourly}</Alert>
      ) : (
        <HourlyForecast data={weatherData.hourly?.list} />
      )}

      {loading.daily ? (
        <CircularProgress />
      ) : error.daily ? (
        <Alert severity="error">{error.daily}</Alert>
      ) : (
        <DailyForecast data={weatherData.daily?.list} />
      )}
    </Box>
  );
};

export default WeatherDashboard;