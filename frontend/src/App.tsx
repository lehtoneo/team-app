import React from 'react';

import HomePage from './components/pages/HomePage';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import SignInUpModal from './components/modals/SignInUpModal';
import useCurrentUser from './hooks/useCurrentUser';
import useSignOut from './hooks/useSignOut';
import RequireAuthPage from './components/RequireAuth';
import TeamsMainPage from './components/pages/TeamsPage';
import OwnTeamsPage from './components/pages/OwnTeamsPage';
import TeamPage from './components/pages/team/TeamPage';
import SingleEventPage from './components/pages/team/team-events/SingleEventPage';
import TeamJoinPage from './components/pages/TeamJoinPage';
import useSignIn from './hooks/useSignIn';
import useConfirm from './hooks/useConfirm';
import ConfirmModal from './components/modals/ConfirmModal';
import LoadingPage from './components/pages/LoadingPage';
import CreateTeamPage from './components/pages/CreateTeamPage';
import MyEventsPage from './components/pages/my-events';
import AboutPage from './components/pages/AboutPage';

function App() {
  const { onConfirm, onCancel, confirmState } = useConfirm();
  const { userWantsToLogin, setUserWantsToLogin } = useSignIn();
  const { signOut } = useSignOut();
  const userState = useCurrentUser({ updateValues: true });
  if (userState.isLoggedIn === undefined) {
    return <LoadingPage />;
  }
  return (
    <div className="flex-row bg-gray-200" id="app">
      <ConfirmModal
        confirmState={confirmState}
        isOpen={confirmState.show}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
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
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route
            path="my-events"
            element={
              <RequireAuthPage userState={userState}>
                <MyEventsPage />
              </RequireAuthPage>
            }
          />
          <Route
            path="teams"
            element={
              <RequireAuthPage userState={userState}>
                <TeamsMainPage />
              </RequireAuthPage>
            }
          />
          <Route
            path="/teams/create"
            element={
              <RequireAuthPage userState={userState}>
                <CreateTeamPage />
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
          <Route path="/teams/join/:joinId" element={<TeamJoinPage />} />
          <Route
            path="/teams/:teamId/*"
            element={
              <RequireAuthPage userState={userState}>
                <TeamPage />
              </RequireAuthPage>
            }
          />
          <Route
            path="/events/:eventId"
            element={
              <RequireAuthPage userState={userState}>
                <SingleEventPage />
              </RequireAuthPage>
            }
          />
          <Route path="/*" element={<div>Page Not found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
