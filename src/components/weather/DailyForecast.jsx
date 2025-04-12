import { Card, CardContent, Box, Typography, Divider } from '@mui/material';

const DailyForecast = ({ data }) => {
  if (!data) return null;

  const getDayName = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          7-Day Forecast
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {data.map((day, index) => (
            <Box key={day.dt}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 2,
                }}
              >
                <Typography sx={{ width: '120px' }}>
                  {index === 0 ? 'Today' : getDayName(day.dt)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <img 
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                  <Typography sx={{ width: '100px', textAlign: 'right' }}>
                    {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
                  </Typography>
                </Box>
              </Box>
              {index < data.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DailyForecast;