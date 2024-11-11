import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: 'e2b1c7a4a7e74e6a8b1133733210804',
  },
});

export default api;