import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://api.weatherapi.com/v1/', // for development
  baseURL: 'https://api.weatherapi.com/v1/',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: '8ad0d366eba14f8087e220940241111',
  },
});

export default api;