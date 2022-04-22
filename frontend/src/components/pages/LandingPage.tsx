import React from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import Button from '../Button';
import PageContainer from './components/PageContainer';
import MyUpcomingEvents from '../MyUpcomingEvents';
import useSignIn from '../../hooks/useSignIn';
const LoggedInLandingPage = ({ userFirstName }: { userFirstName?: string }) => {
  const headerText = `Hi ${userFirstName || ''}!`;
  return (
    <PageContainer header={headerText}>
      <MyUpcomingEvents />
    </PageContainer>
  );
};

const LandingPage = () => {
  const { isLoggedIn, currentUser } = useCurrentUser();
  const { setUserWantsToLogin } = useSignIn();
  if (isLoggedIn === undefined) {
    return <PageContainer></PageContainer>;
  }
  if (isLoggedIn) {
    return <LoggedInLandingPage userFirstName={currentUser?.firstname} />;
  }
  return (
    <PageContainer header="Welcome to Team app">
      <div className="my-2">
        <Button onClick={() => setUserWantsToLogin(true)}>
          Sign In to get started
        </Button>
      </div>
    </PageContainer>
  );
};

export default LandingPage;
