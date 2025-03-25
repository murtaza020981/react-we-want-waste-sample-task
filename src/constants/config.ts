
// API Configuration
export const API_CONFIG = {
  // Base URL for API endpoints
  BASE_URL: process.env.REACT_APP_API_BASE_URL,
  
  // Skip service endpoints
  SKIPS: {
    BY_LOCATION: '/skips/by-location',
  },
  
  // Default location parameters
  DEFAULT_LOCATION: {
    POSTCODE: process.env.REACT_APP_DEFAULT_POSTCODE,
    AREA: process.env.REACT_APP_DEFAULT_AREA,
  },
};

// Asset URLs
export const ASSET_URLS = {
  SKIP_IMAGE: process.env.REACT_APP_SKIP_IMAGE_URL,
};
