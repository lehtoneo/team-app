import React from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import Button from '../Button';
import PageContainer from './components/PageContainer';
import useSignIn from '../../hooks/useSignIn';
import useAppOpenStatistics from '../../hooks/useAppOpenStatistics';
const AppOpenStatistics = () => {
  const { appOpenStatistics } = useAppOpenStatistics();
  return (
    <div>
      <div className="text-xl">
        There are already {appOpenStatistics?.teamCount} teams using the
        application!
      </div>
      <div className="text-xl">
        {appOpenStatistics?.userCount} registered users!
      </div>
      <div className="text-xl">
        And {appOpenStatistics?.eventCount} events created!
      </div>
    </div>
  );
};

const HomePage = () => {
  const { isLoggedIn, currentUser } = useCurrentUser();
  const { setUserWantsToLogin } = useSignIn();
  if (isLoggedIn === undefined) {
    return <PageContainer></PageContainer>;
  }
  const headerText = isLoggedIn
    ? `Hello ${currentUser.firstname}`
    : `Welcome to Team app`;
  return (
    <PageContainer header={headerText}>
      <AppOpenStatistics />
      {!isLoggedIn && (
        <div className="my-2">
          <Button onClick={() => setUserWantsToLogin(true)}>
            Sign In to get started
          </Button>
        </div>
      )}
    </PageContainer>
  );
};

export default HomePage;
