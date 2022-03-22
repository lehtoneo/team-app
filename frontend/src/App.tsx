import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';

import { getApolloClient } from './utils/ApolloClient';
import LandingPage from './components/pages/LandingPage';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import LoginModal from './components/modals/SignInModal';
import SignUpModal from './components/modals/SignUpModal';

function App() {
  const apolloClient = getApolloClient();
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState<boolean>(false);
  const handleCreateAccountClick = () => {
    setLoginModalOpen(false);
    setSignUpModalOpen(true);
  };
  return (
    <ApolloProvider client={apolloClient}>
      <div className="flex-row" id="app">
        <LoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onCreateAccountClick={handleCreateAccountClick}
        />
        <SignUpModal
          isOpen={signUpModalOpen}
          onClose={() => setSignUpModalOpen(false)}
        />
        <NavBar onSignInPress={() => setLoginModalOpen(true)} />
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
