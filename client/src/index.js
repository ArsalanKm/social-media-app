import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/auth/AuthContext';
import { SearchContextProvider } from './context/search/SearchContext';

import { WithAxios } from './http/withAxios';
import './index.css';

ReactDOM.render(
  <AuthContextProvider>
    <WithAxios>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </WithAxios>
  </AuthContextProvider>,

  document.getElementById('root')
);
