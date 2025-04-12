import { useState, useEffect } from 'react';
import { Stack, CircularProgress, Alert } from '@mui/material';
import CurrentWeather from '../weather/CurrentWeather';
import HourlyForecast from '../weather/HourlyForecast';
import DailyForecast from '../weather/DailyForecast';
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

  useEffect(() => {
    const fetchWeatherData = async () => {
      const lat = 40.7128;
      const lon = -74.0060;

      try {
        const current = await fetchCurrentWeather(lat, lon);
        setWeatherData(prev => ({ ...prev, current }));
      } catch (err) {
        setError(prev => ({ ...prev, current: err.message }));
      } finally {
        setLoading(prev => ({ ...prev, current: false }));
      }

      try {
        const hourly = await fetchHourlyForecast(lat, lon);
        setWeatherData(prev => ({ ...prev, hourly }));
      } catch (err) {
        setError(prev => ({ ...prev, hourly: err.message }));
      } finally {
        setLoading(prev => ({ ...prev, hourly: false }));
      }

      try {
        const daily = await fetchDailyForecast(lat, lon);
        setWeatherData(prev => ({ ...prev, daily }));
      } catch (err) {
        setError(prev => ({ ...prev, daily: err.message }));
      } finally {
        setLoading(prev => ({ ...prev, daily: false }));
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <Stack spacing={3}>
      <div>
        {loading.current ? (
          <CircularProgress />
        ) : error.current ? (
          <Alert severity="error">{error.current}</Alert>
        ) : (
          <CurrentWeather data={weatherData.current} />
        )}
      </div>

      <div>
        {loading.hourly ? (
          <CircularProgress />
        ) : error.hourly ? (
          <Alert severity="error">{error.hourly}</Alert>
        ) : (
          <HourlyForecast data={weatherData.hourly?.list} />
        )}
      </div>

      <div>
        {loading.daily ? (
          <CircularProgress />
        ) : error.daily ? (
          <Alert severity="error">{error.daily}</Alert>
        ) : (
          <DailyForecast data={weatherData.daily?.list} />
        )}
      </div>
    </Stack>
  );
};

export default WeatherDashboard;