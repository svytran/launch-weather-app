import { ThemeProvider } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import WeatherDashboard from './components/layout/WeatherDashboard';
import NewsContainer from './components/news/NewsContainer';
import { theme } from './components/shared/theme';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 4,
        overflow: 'hidden'
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ textAlign: 'center', mb: 4 }}
        >
          Weather & News Updates
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 3,
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'hidden'
        }}>
          {/* Weather Section */}
          <Box sx={{ flex: '1 1 60%' }}>
            <WeatherDashboard />
          </Box>

          {/* News Section */}
          <Box sx={{ 
            flex: '1 1 40%',
            height: 'calc(100vh - 150px)',
            overflow: 'auto',
            position: 'sticky',
            top: 0,
            '&::-webkit-scrollbar': {
              width: '8px'
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
              '&:hover': {
                background: '#555'
              }
            },
            scrollbarWidth: 'thin',
            scrollbarColor: '#888 #f1f1f1'
          }}>
            <NewsContainer />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;