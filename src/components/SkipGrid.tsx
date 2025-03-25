import React from 'react';
import { Grid, Box, Typography, Fade, Stack, useTheme } from '@mui/material';
import SkipCard from './SkipCard';
import { Skip } from '../types';
import CircleIcon from '@mui/icons-material/Circle';

interface SkipGridProps {
  skips: Skip[]; 
  selectedSkip: Skip | null; 
  onSelectSkip: (skip: Skip) => void;
}

// SkipGrid component that displays skips in a grid format
const SkipGrid: React.FC<SkipGridProps> = ({ skips, selectedSkip, onSelectSkip }) => {
  const theme = useTheme();
  
  // Filter skips based on their placement type
  const roadPlacementSkips = skips.filter(skip => skip.allowed_on_road);
  const privatePlacementSkips = skips.filter(skip => !skip.allowed_on_road);

  // If no skips are available, display a message
  if (skips.length === 0) {
    return (
      <Box 
        sx={{ 
          mt: 6, 
          p: 4, 
          textAlign: 'center',
          border: `1px dashed ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary" align="center">
          No skips available for this location.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Please try a different postcode or contact our customer service.
        </Typography>
      </Box>
    );
  }

  // If there are skips available, display them in a grid
  return (
    <Box>
      {roadPlacementSkips.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Stack 
            direction="row" 
            spacing={1.5} 
            alignItems="center" 
            sx={{ 
              mb: 3,
              pl: 1
            }}
          >
            <CircleIcon sx={{ color: '#37B24D', fontSize: 10 }} />
            <Typography 
              variant={theme.breakpoints.down('sm') ? "h6" : "h5"}
              sx={{ 
                fontWeight: 600,
                color: '#37B24D',
              }}
            >
              Road Placement Available
            </Typography>
          </Stack>
          
          <Grid container spacing={3}>
            {roadPlacementSkips.map((skip, index) => (
              <Fade in={true} timeout={300 + index * 100} key={skip.id}>
                <Grid item xs={12} sm={6} md={4}>
                  <SkipCard 
                    skip={skip} 
                    isSelected={selectedSkip?.id === skip.id}
                    onSelectSkip={onSelectSkip}
                  />
                </Grid>
              </Fade>
            ))}
          </Grid>
        </Box>
      )}

      {privatePlacementSkips.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Stack 
            direction="row" 
            spacing={1.5} 
            alignItems="center" 
            sx={{ 
              mb: 3,
              pl: 1
            }}
          >
            <CircleIcon sx={{ color: '#FF8A00', fontSize: 10 }} />
            <Typography 
              variant={theme.breakpoints.down('sm') ? "h6" : "h5"}
              sx={{ 
                fontWeight: 600,
                color: '#FF8A00',
              }}
            >
              Private Property Only
            </Typography>
          </Stack>
          
          <Grid container spacing={3}>
            {privatePlacementSkips.map((skip, index) => (
              <Fade in={true} timeout={300 + (roadPlacementSkips.length * 100) + (index * 100)} key={skip.id}>
                <Grid item xs={12} sm={6} md={4}>
                  <SkipCard 
                    skip={skip} 
                    isSelected={selectedSkip?.id === skip.id}
                    onSelectSkip={onSelectSkip}
                  />
                </Grid>
              </Fade>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default SkipGrid; 