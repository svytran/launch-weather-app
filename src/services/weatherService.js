const API_KEY = '255e9eb06678e5e17f973a5cc0f20056';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Weather data fetch failed');
    return await response.json();
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const fetchHourlyForecast = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Hourly forecast fetch failed');
    return await response.json();
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
    throw error;
  }
};

export const fetchDailyForecast = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&units=imperial&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Daily forecast fetch failed');
    return await response.json();
  } catch (error) {
    console.error('Error fetching daily forecast:', error);
    throw error;
  }
};