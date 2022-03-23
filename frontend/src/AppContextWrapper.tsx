import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { getApolloClient } from './utils/ApolloClient';
import App from './App';

const AppContextWrapper = () => {
  const apolloClient = getApolloClient();
  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );
};

export default AppContextWrapper;
