import React from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import Button from '../Button';
import PageContainer from './components/PageContainer';
import useSignIn from '../../hooks/useSignIn';
import Header from '../Header';
const LoggedInLandingPage = ({ userFirstName }: { userFirstName?: string }) => {
  const headerText = `Team app`;
  return (
    <PageContainer header={headerText}>
      <Header size={3} center={false}>
        Welcome
      </Header>
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
