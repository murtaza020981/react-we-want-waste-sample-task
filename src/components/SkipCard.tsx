import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CardActions,
  Button,
  useTheme,
  CardMedia,
  Stack,
  useMediaQuery
} from '@mui/material';
import { Skip } from '../types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DirectionsCarOutlined, ErrorOutlineOutlined, HomeOutlined } from '@mui/icons-material';
import { ASSET_URLS } from '../constants/config';

/** * Props for the SkipCard component */
interface SkipCardProps {
  skip: Skip;
  isSelected?: boolean;
  onSelectSkip: (skip: Skip) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected = false, onSelectSkip }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const totalPrice = skip.price_before_vat;

  const isDisabled = !skip.allowed_on_road && !skip.allows_heavy_waste;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        border: isSelected ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'visible',
        opacity: isDisabled ? 0.75 : 1,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: isDisabled ? 'none' : 'translateY(-8px)',
          boxShadow: isDisabled ? 1 : 8
        }
      }}
      onClick={() => !isDisabled && onSelectSkip(skip)}
    >
      {/* Selection indicator */}
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            zIndex: 10,
            width: 24,
            height: 24,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          <CheckCircleIcon 
            sx={{ 
              fontSize: 24, 
              color: theme.palette.primary.main
            }}
          />
        </Box>
      )}
      
      {/* Skip image */}
      <CardMedia
        component="img"
        height="160"
        image={ASSET_URLS.SKIP_IMAGE}
        alt={`${skip.size} Yard Skip`}
        sx={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Box>
          {/* Skip size and price header */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontWeight: 700, 
                color: theme.palette.primary.main,
                fontSize: isMobile ? '1.25rem' : '1.5rem',
                mb: 0.5
              }}
            >
              {skip.size} Yard Skip
            </Typography>
            
            <Box textAlign="right">
              <Typography 
                variant="h5" 
                fontWeight="700" 
                color={isSelected ? theme.palette.primary.main : 'text.primary'}
                sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}
              >
                £{totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Stack>
          
          {/* Hire period information */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {skip.hire_period_days} day hire period
          </Typography>
        </Box>
        
        {/* Skip feature tags */}
        <Stack 
          direction="row" 
          flexWrap="wrap" 
          sx={{ 
            mb: 1.5, 
            gap: 0.75 
          }}
        >
          {skip.allowed_on_road ? (
            <Chip 
              icon={<DirectionsCarOutlined fontSize="small" />}
              label="Road Placement" 
              color="success"
              size="small"
              variant='outlined'
              sx={{ 
                height: 24, 
                borderRadius: 1,
                fontSize: '0.7rem',
                '& .MuiChip-label': { px: 1, fontSize: '0.7rem' }, 
                '& .MuiChip-icon': { fontSize: '0.9rem', ml: 0.5 } 
              }}
            />
          ) : (
            <Chip 
              icon={<HomeOutlined fontSize="small" />}
              label="Private Property Only" 
              color="warning"
              size="small"
              variant='outlined'
              sx={{ 
                height: 24, 
                borderRadius: 1,
                fontSize: '0.7rem',
                '& .MuiChip-label': { px: 1, fontSize: '0.7rem' }, 
                '& .MuiChip-icon': { fontSize: '0.9rem', ml: 0.5 } 
              }}
            />
          )}
          
          {!skip.allows_heavy_waste && (
            <Chip 
              icon={<ErrorOutlineOutlined fontSize="small" />}
              label="Not Suitable For Heavy Waste" 
              color="error"
              size="small"
              variant='outlined'
              sx={{ 
                height: 24, 
                borderRadius: 1,
                fontSize: '0.7rem',
                '& .MuiChip-label': { px: 1, fontSize: '0.7rem' }, 
                '& .MuiChip-icon': { fontSize: '0.9rem', ml: 0.5 } 
              }}
            />
          )}
        </Stack>
      </CardContent>
      
      {/* Action buttons */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        {isDisabled ? (
          <Button 
            fullWidth 
            variant="outlined" 
            disabled
            sx={{ 
              borderRadius: '4px',
              py: 0.75,
              textTransform: 'none',
              color: theme.palette.text.disabled,
              borderColor: theme.palette.divider,
              opacity: 0.8
            }}
          >
            Not Available
          </Button>
        ) : (
          <Button 
            fullWidth 
            variant={isSelected ? "contained" : "outlined"} 
            color="primary"
            onClick={() => onSelectSkip(skip)}
            sx={{ 
              borderRadius: '4px',
              py: 0.75,
              textTransform: 'none',
              fontWeight: isSelected ? 'bold' : 'medium',
              bgcolor: isSelected ? theme.palette.primary.main : 'transparent',
              borderColor: isSelected ? 'transparent' : theme.palette.primary.main,
              color: isSelected ? (theme.palette.mode === 'dark' ? '#000' : '#fff') : theme.palette.primary.main,
              '&:hover': {
                bgcolor: isSelected ? theme.palette.primary.light : 'rgba(77, 171, 247, 0.08)',
              }
            }}
          >
            {isSelected ? "Selected" : "Select This Skip"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default SkipCard; 