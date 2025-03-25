import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  useMediaQuery,
  useTheme,
  Container
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ThemeToggle from './ThemeToggle';

// Header component that displays the top navigation bar
const Header: React.FC = () => {
  // Get the current theme and check if the screen size is mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        backdropFilter: 'blur(8px)', 
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(18, 18, 18, 0.9)' 
          : 'rgba(255, 255, 255, 0.8)', 
        borderBottom: '1px solid', 
        borderColor: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(0, 0, 0, 0.1)', 
      }}
    >
      <Container maxWidth="lg"> 
        <Toolbar disableGutters sx={{ py: 1 }}> 
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Box display="flex" alignItems="center" gap={1}>
              <LocalShippingIcon 
                sx={{ 
                  color: theme.palette.primary.main, 
                  fontSize: isMobile ? 22 : 26, 
                  mr: 1 
                }} 
              />
              {/* Title of the header */}
              <Typography 
                variant={isMobile ? 'h6' : 'h5'}
                component="h1" 
                fontWeight="bold"
                color="text.primary"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.5px'
                }}
              >
                Skip Services 
              </Typography>
            </Box>
            
            <ThemeToggle /> {/* Component to toggle between light and dark themes */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; // Exporting the Header component for use in other parts of the application