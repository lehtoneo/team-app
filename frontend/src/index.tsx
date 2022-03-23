import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import AppContextWrapper from './AppContextWrapper';
import './index.css';
ReactDOM.render(
  <BrowserRouter>
    <AppContextWrapper />
  </BrowserRouter>,
  document.getElementById('root')
);
