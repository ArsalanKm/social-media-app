import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/auth/AuthContext';
import { SearchContextProvider } from './context/search/SearchContext';
import { WithAxios } from './http/index';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WithAxios>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </WithAxios>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
