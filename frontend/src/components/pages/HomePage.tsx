import React from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import PageContainer from './components/PageContainer';
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
  if (isLoggedIn === undefined) {
    return <PageContainer></PageContainer>;
  }
  const headerText = isLoggedIn
    ? `Hello ${currentUser.firstname}`
    : `Welcome to Team app`;
  return (
    <PageContainer header={headerText}>
      <AppOpenStatistics />
    </PageContainer>
  );
};

export default HomePage;
