import React from 'react';
import { Link } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import useTeamConnection from '../../hooks/useTeamConnection';
import Button from '../Button';
import TeamList from '../TeamList';
import PageContainer from './components/PageContainer';
import Header from '../Header';
import MyEvents from '../MyEvents';
const LoggedInLandingPage = ({ userFirstName }: { userFirstName?: string }) => {
  const headerText = `Hi ${userFirstName || ''}!`;
  return (
    <PageContainer header={headerText}>
      <MyEvents />
    </PageContainer>
  );
};

const LandingPage = () => {
  const { teams } = useTeamConnection();
  const { isLoggedIn, currentUser } = useCurrentUser();
  if (isLoggedIn === undefined) {
    return <PageContainer></PageContainer>;
  }
  if (isLoggedIn) {
    return <LoggedInLandingPage userFirstName={currentUser?.firstname} />;
  }
  return (
    <PageContainer>
      <Header>Welcome to Team app</Header>
      <TeamList teams={teams} />
    </PageContainer>
  );
};

export default LandingPage;
