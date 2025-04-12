const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const searchLocations = async (searchQuery) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching locations:', error);
    throw error;
  }
};