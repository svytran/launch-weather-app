import { ThemeProvider } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';
import WeatherDashboard from './components/layout/WeatherDashboard';
import { theme } from './components/shared/theme';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ textAlign: 'center', mb: 4 }}
          >
            Weather Dashboard
          </Typography>
          <WeatherDashboard />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;