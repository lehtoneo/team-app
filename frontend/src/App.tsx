import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { getApolloClient } from './utils/ApolloClient';
import LandingPage from './components/pages/LandingPage';

function App() {
  const apolloClient = getApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <h1>Workout app</h1>
        <LandingPage />
      </div>
    </ApolloProvider>
  );
}

export default App;
