import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';

import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
  sidebar: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    const user = INITIAL_STATE.user;
    if (user) {
      axios
        .get(`/users?userId=${user._id}`)
        .then((res) => dispatch({ type: 'LOGIN_SUCCESS', payload: res.data }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        sidebar: state.sidebar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
