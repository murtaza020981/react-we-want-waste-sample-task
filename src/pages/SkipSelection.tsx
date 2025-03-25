import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Skeleton,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SkipGrid from '../components/SkipGrid';
import { Skip } from '../types';
import { fetchSkipsByLocation } from '../api/skipService';
import CircleIcon from '@mui/icons-material/Circle';

const SkipSkeleton = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100%',
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        p: 2,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 1, mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Skeleton variant="text" width="40%" height={40} />
        <Skeleton variant="text" width="25%" height={40} />
      </Box>
      <Skeleton variant="text" width="70%" height={24} sx={{ mb:2 }} />
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Skeleton variant="rectangular" width={120} height={24} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={140} height={24} sx={{ borderRadius: 1 }} />
      </Box>
      <Box sx={{ mt: 'auto' }}>
        <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
      </Box>
    </Box>
  );
};

const SkipSelectionSkeleton = () => {
  return (
    <>
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
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#37B24D',
            }}
          >
            Road Placement Available
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <SkipSkeleton /> {/* Skeleton for loading state */}
            </Grid>
          ))}
        </Grid>
      </Box>

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
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#FF8A00',
            }}
          >
            Private Property Only
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <SkipSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

const SkipSelection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSkips = async () => {
      setLoading(true);
      try {
        const data = await fetchSkipsByLocation(); // Fetch skips from the API
        setSkips(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading skips:', error);
        setLoading(false);
      }
    };

    loadSkips();
  }, []);

  const handleSelectSkip = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  const handleContinue = () => {
    alert(`Selected skip: ${selectedSkip?.size} Yard Skip - £${selectedSkip?.price_before_vat}`);
  };

  return (
    <Box sx={{
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            textAlign: 'center',
            mb: isMobile ? 3 : 6,
            pt: 3,
            pb: 4,
            backgroundColor: theme.palette.mode === 'dark' ? '#1a2027' : '#f8f9fa',
            borderRadius: 4,
            p: { xs: 2, sm: 3, md: 4 },
            boxShadow: theme.shadows[4],
            color: theme.palette.text.primary
          }}
        > 
         {/* Title of the page */}
          <Typography
            variant={isMobile ? "h6" : "h4"}
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: isMobile ? 0 : 1
            }}
          >
            Choose Your Skip Size
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '0.75rem', sm: '1.1rem' },
              lineHeight: 1.6,
              color: theme.palette.text.secondary
            }}
          >
            {/* Description of the page */}
            Select the skip size that best suits your needs
          </Typography>

        </Box>


        {loading ? (
          <SkipSelectionSkeleton /> // Skeleton for loading state 
        ) : (
          <>
            <SkipGrid  // Grid component for displaying skips
              skips={skips}
              selectedSkip={selectedSkip}
              onSelectSkip={handleSelectSkip}
            />
          </>
        )}

        {selectedSkip && (
          <Box
            sx={{
              position: 'sticky',
              bottom: 20,
              left: 0,
              right: 0,
              zIndex: 10,
              mt: 6,
              mb: 2
            }}
          >
            <Paper
              elevation={4}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' ? '#1a2027' : theme.palette.background.paper,
                color: theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                gap: 2
              }}
            >
              <Stack direction="column" spacing={0.5}>
                <Typography variant="body2" color={theme.palette.text.secondary}>
                  Selected Skip:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {selectedSkip.size} Yard Skip - £{(selectedSkip.price_before_vat + (selectedSkip.price_before_vat * selectedSkip.vat / 100)).toFixed(2)}
                </Typography>
              </Stack>

              {/* Button to continue to delivery */}
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleContinue}
                sx={{
                  py: 1.5,
                  px: { xs: 3, sm: 4 },
                  borderRadius: 2,
                  boxShadow: 4,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  fontWeight: 'bold',
                  width: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                    transform: 'translateY(-2px)',
                    boxShadow: 8
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Continue to Delivery
              </Button>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SkipSelection; 