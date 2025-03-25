import React, { useContext } from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../App';

const ThemeToggle: React.FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  
  return (
    // Tooltip component 
    <Tooltip title={theme.palette.mode === 'dark' ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton 
        onClick={colorMode.toggleColorMode}
        color="inherit" 
        size="small"
        aria-label="toggle dark/light mode"
        sx={{ 
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)'
          }
        }}
      >
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle; 