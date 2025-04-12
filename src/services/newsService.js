const API_KEY = import.meta.env.VITE_NYT_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/topstories/v2';

export const fetchTopStories = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/home.json?api-key=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch news');
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};