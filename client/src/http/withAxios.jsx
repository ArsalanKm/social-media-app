

import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import instance from '.';

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

