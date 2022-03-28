import React, { useState } from 'react';

import LandingPage from './components/pages/LandingPage';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import SignInUpModal from './components/modals/SignInUpModal';
import useCurrentUser from './hooks/useCurrentUser';
import useSignOut from './hooks/useSignOut';
import RequireAuthPage from './components/RequireAuth';
import StartWorkoutPage from './components/pages/StartWorkoutPage';
import StartWorkoutTemplatePage from './components/pages/StartWorkoutTemplatePage';

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
            path="start-workout"
            element={
              <RequireAuthPage userState={userState}>
                <StartWorkoutPage />
              </RequireAuthPage>
            }
          />
          <Route
            path="start-workout/template"
            element={
              <RequireAuthPage userState={userState}>
                <StartWorkoutTemplatePage />
              </RequireAuthPage>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
