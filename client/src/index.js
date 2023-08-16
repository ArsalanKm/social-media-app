import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/auth/AuthContext';
import { SearchContextProvider } from './context/search/SearchContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { WithAxios } from './http/index';
import { theme } from './App';
import './index.css';

console.log(theme);
ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <WithAxios>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </WithAxios>
    </AuthContextProvider>
  </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
