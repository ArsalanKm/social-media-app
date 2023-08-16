import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8800/api',
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000,
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default instance;
