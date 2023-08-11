import { createContext, useEffect, useReducer } from 'react';
import instance from '../../http';

import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  user: undefined,
  isFetching: false,
  error: false,
  sidebar: false,
  contacts: false,
  token: localStorage.getItem('token'),
  snackbar: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token') || null);
    if (token && token !== null && token.length > 20) {
      instance.get(`users/userInfo`).then((res) => {
        if (res?.data?.data) {
          localStorage.setItem('user', JSON.stringify(res?.data?.data));
          dispatch({ type: 'LOGIN_SUCCESS', payload: res?.data?.data });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  }, [state.user]);

  // useEffect(() => {
  //   if (state.token) {
  //     localStorage.setItem('token', JSON.stringify(state.token));
  //   }
  // }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        sidebar: state.sidebar,
        contacts: state.contacts,
        snackbar: state.snackbar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContextDispatch = () => {};
