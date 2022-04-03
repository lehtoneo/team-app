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
import TeamPage from './components/pages/TeamPage';
import CreateTeamEventPage from './components/pages/CreateTeamEventPage';
import EventPage from './components/pages/EventPage';
import TeamJoinPage from './components/pages/TeamJoinPage';
import useSignIn from './hooks/useSignIn';

function App() {
  const { userWantsToLogin, setUserWantsToLogin } = useSignIn();
  const { signOut } = useSignOut();
  const userState = useCurrentUser({ updateValues: true });
  if (userState.isLoggedIn === undefined) {
    return <div>Loading</div>;
  }
  return (
    <div className="flex-row bg-gray-200" id="app">
      <SignInUpModal
        isOpen={userWantsToLogin}
        onClose={() => setUserWantsToLogin(false)}
      />
      <div className="p-2">
        <NavBar
          onSignInPress={() => setUserWantsToLogin(true)}
          isLoggedIn={userState.isLoggedIn}
          onSignOutPress={signOut}
        />
      </div>
      <div className="p-5 container mx-auto bg-white min-h-screen rounded my-0">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="teams"
            element={
              <RequireAuthPage userState={userState}>
                <TeamsMainPage />
              </RequireAuthPage>
            }
          />
          <Route
            path="/teams/own"
            element={
              <RequireAuthPage userState={userState}>
                <OwnTeamsPage />
              </RequireAuthPage>
            }
          />
          <Route
            path="/teams/:teamId"
            element={
              <RequireAuthPage userState={userState}>
                <TeamPage />
              </RequireAuthPage>
            }
          />
          <Route
            path="/teams/:teamId/create-event"
            element={
              <RequireAuthPage userState={userState}>
                <CreateTeamEventPage />
              </RequireAuthPage>
            }
          />
          <Route
            path="/teams/:teamId/events/:eventId"
            element={
              <RequireAuthPage userState={userState}>
                <EventPage />
              </RequireAuthPage>
            }
          />
          <Route path="/teams/join/:joinId" element={<TeamJoinPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
