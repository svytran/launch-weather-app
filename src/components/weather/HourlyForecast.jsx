import { Card, CardContent, Box, Typography } from '@mui/material';

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true
  }).toUpperCase();
};

const HourlyForecast = ({ data }) => {
  if (!data) return null;

  return (
    <Card elevation={3} sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 3 }}>
          24 hour Forecast (3-hour intervals)
        </Typography>
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            pb: 2,
            '::-webkit-scrollbar': {
              height: 8,
            },
            '::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
              borderRadius: 4,
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: 4,
            },
          }}
        >
          {data.slice(0, 8).map((forecast) => (  // Show next 24 hours (8 intervals of 3 hours)
            <Box
              key={forecast.dt}
              sx={{
                minWidth: 100,
                textAlign: 'center',
                p: 2,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <Typography>{formatTime(forecast.dt)}</Typography>
              <img 
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
              />
              <Typography variant="h6">{Math.round(forecast.main.temp)}°F</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default HourlyForecast;