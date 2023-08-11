import axios from 'axios';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth/AuthContext';

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

export const WithAxios = ({ children }) => {
  const { dispatch } = useContext(AuthContext);
  useEffect(() => {
    instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err?.response.status >= 400) {
          dispatch({ type: 'SNACKBAR' });
        }
        if (err?.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          dispatch({ type: 'LOGOUT' });
        }
        return err;
      }
    );
  });

  return children;
};

export default instance;
