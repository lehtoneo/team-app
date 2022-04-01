import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from './utils/ApolloClient';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const AppContextWrapper = () => {
  const apolloClient = getApolloClient();
  const reduxStore = store;
  return (
    <BrowserRouter>
      <Provider store={reduxStore}>
        <ApolloProvider client={apolloClient}>
          <ToastContainer />
          <App />
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default AppContextWrapper;
