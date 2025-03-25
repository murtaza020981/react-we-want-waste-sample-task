import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider, CssBaseline, Box, GlobalStyles, createTheme, PaletteMode } from '@mui/material';
import Header from './components/Header';
import SkipSelection from './pages/SkipSelection';

// Create a context for color mode 
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'dark' as PaletteMode
});

// Main App component
function App() {
  const [mode, setMode] = useState<PaletteMode>('dark');
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  // Theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#4DABF7' : '#1C6DD0',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#F8F9FA',
            paper: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none', 
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12, 
              },
            },
          },
        },
      }),
    [mode],
  );

  const globalStyles = {
    '*::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '*::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '*::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '4px',
    },
    '*::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
    'html, body': {
      scrollBehavior: 'smooth', 
    },
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <Box
          sx={{
            minHeight: '100vh', 
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Header /> {/* Header component */}
          <Box component="main" sx={{ flexGrow: 1 }}>
            <SkipSelection /> {/* Skip selection component */}
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;