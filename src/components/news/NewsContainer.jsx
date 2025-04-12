import { useState, useEffect } from 'react';
import { CircularProgress, Alert } from '@mui/material';
import NewsSection from './NewsSection';
import { fetchTopStories } from '../../services/newsService';

const NewsContainer = () => {
  const [newsStories, setNewsStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const stories = await fetchTopStories();
        setNewsStories(stories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  
  return <NewsSection stories={newsStories} />;
};

export default NewsContainer;