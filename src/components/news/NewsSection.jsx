import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box, 
  Link,
  CardActionArea 
} from '@mui/material';

const NewsSection = ({ stories }) => {
  const [displayCount, setDisplayCount] = useState(5);
  
  if (!stories?.length) return null;

  return (
    <Box sx={{ overflow: 'visible' }}>
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 3 }}>
        New York Times Stories
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {stories.slice(0, displayCount).map((story, index) => (
          <Card key={index} elevation={2}>
            <CardActionArea 
              component={Link}
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {story.multimedia?.[0]?.url && (
                <CardMedia
                  component="img"
                  height="200"
                  image={story.multimedia[0].url}
                  alt={story.multimedia[0].caption || story.title}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {story.title}
                </Typography>
                {story.byline && (
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    gutterBottom
                  >
                    {story.byline}
                  </Typography>
                )}
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                  }}
                >
                  {story.abstract}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      {displayCount < stories.length && (
        <Box sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          <Button 
            variant="contained" 
            onClick={() => setDisplayCount(prev => Math.min(prev + 5, stories.length))}
            sx={{
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Load More Stories
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default NewsSection;