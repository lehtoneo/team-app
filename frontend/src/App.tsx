import React, { useState } from 'react';

import LandingPage from './components/pages/LandingPage';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import SignInUpModal from './components/modals/SignInUpModal';
import useCurrentUser from './hooks/useCurrentUser';
import useSignOut from './hooks/useSignOut';


function App() {
  const [signInUpModalOpen, setSignInUpModalOpen] = useState<boolean>(false);
  const { signOut } = useSignOut();
  const { isLoggedIn } = useCurrentUser();

  return (
    <div className="flex-row" id="app">
      <SignInUpModal
        isOpen={signInUpModalOpen}
        onClose={() => setSignInUpModalOpen(false)}
      />
      <NavBar onSignInPress={() => setSignInUpModalOpen(true)} isLoggedIn={isLoggedIn} onSignOutPress={signOut}/>
      <div className="p-5">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
