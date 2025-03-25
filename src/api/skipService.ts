import axios from 'axios';
import { Skip } from '../types';
import { API_CONFIG } from '../constants/config';

export const fetchSkipsByLocation = async (): Promise<Skip[]> => {
  try {
    const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.SKIPS.BY_LOCATION}`, {
      params: {
        postcode: API_CONFIG.DEFAULT_LOCATION.POSTCODE,
        area: API_CONFIG.DEFAULT_LOCATION.AREA
      }
    });
    return response.data as Skip[];
  } catch (error) {
    console.error('Error fetching skips:', error);
    throw error;
  }
};
