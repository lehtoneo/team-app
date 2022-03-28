import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { getApolloClient } from './utils/ApolloClient';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const AppContextWrapper = () => {
  const apolloClient = getApolloClient();
  const reduxStore = store;
  return (
    <Provider store={reduxStore}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </Provider>
  );
};

export default AppContextWrapper;
