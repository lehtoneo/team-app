import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';

import { getApolloClient } from './utils/ApolloClient';
import LandingPage from './components/pages/LandingPage';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import SignInUpModal, {
  SignInUpModalState
} from './components/modals/SignInUpModal';

function App() {
  const apolloClient = getApolloClient();
  const [signInUpModalOpen, setSignInUpModalOpen] = useState<boolean>(false);

  return (
    <ApolloProvider client={apolloClient}>
      <div className="flex-row" id="app">
        <SignInUpModal
          isOpen={signInUpModalOpen}
          onClose={() => setSignInUpModalOpen(false)}
        />
        <NavBar onSignInPress={() => setSignInUpModalOpen(true)} />
        <div className="p-5">
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
