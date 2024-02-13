import axios, { type AxiosInstance } from 'axios';
import megaverseConfig from '../config/megaverse';
import crossmintConfig from '../config/crossmint';

const megaverseApiClient: AxiosInstance = axios.create({
  baseURL: megaverseConfig.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

// Add a request interceptor
megaverseApiClient.interceptors.request.use((config) => {
  if (config.method === 'post' || config.method === 'delete') {
    // Set a default body parameter for POST and DELETE requests
    config.data = {
      ...config.data,
      candidateId: crossmintConfig.CANDIDATE_ID
    };
  }
  return config;
});

export default megaverseApiClient;
