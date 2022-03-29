import React, { useState } from 'react';

import LandingPage from './components/pages/LandingPage';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import SignInUpModal from './components/modals/SignInUpModal';
import useCurrentUser from './hooks/useCurrentUser';
import useSignOut from './hooks/useSignOut';
import RequireAuthPage from './components/RequireAuth';
import TeamsMainPage from './components/pages/TeamsPage';
import OwnTeamsPage from './components/pages/OwnTeamsPage';

function App() {
  const [signInUpModalOpen, setSignInUpModalOpen] = useState<boolean>(false);
  const { signOut } = useSignOut();
  const userState = useCurrentUser({ updateValues: true });
  if (userState.isLoggedIn === undefined) {
    return <div>Loading</div>;
  }
  return (
    <div className="flex-row" id="app">
      <SignInUpModal
        isOpen={signInUpModalOpen}
        onClose={() => setSignInUpModalOpen(false)}
      />
      <NavBar
        onSignInPress={() => setSignInUpModalOpen(true)}
        isLoggedIn={userState.isLoggedIn}
        onSignOutPress={signOut}
      />
      <div className="p-5">
        <Routes>
          <Route index element={<LandingPage />} />
          <Route
            path="teams"
            element={
              <RequireAuthPage userState={userState}>
                <TeamsMainPage />
              </RequireAuthPage>
            }
          />
          <Route
            path="teams/own"
            element={
              <RequireAuthPage userState={userState}>
                <OwnTeamsPage />
              </RequireAuthPage>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
