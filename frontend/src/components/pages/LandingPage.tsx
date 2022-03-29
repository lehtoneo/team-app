import React from 'react';
import { Link } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import useTeamConnection from '../../hooks/useTeamConnection';
import Button from '../Button';
import TeamList from '../TeamList';
import PageContainer from './components/PageContainer';
import Header from '../Header';
const LoggedInLandingPage = ({ userFirstName }: { userFirstName?: string }) => {
  return (
    <>
      <Header>Hi {userFirstName}!</Header>
      <div className="flex-row">
        <div className="flex justify-center p-2">
          <Link to="/teams">
            <Button className="justify-center">Teams</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

const LandingPage = () => {
  const { teams } = useTeamConnection();
  const { isLoggedIn, currentUser } = useCurrentUser();
  if (isLoggedIn === undefined) {
    return <PageContainer></PageContainer>;
  }
  if (isLoggedIn) {
    return (
      <PageContainer>
        <LoggedInLandingPage userFirstName={currentUser?.firstname} />
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <Header>Welcome to Team app</Header>
      <TeamList teams={teams} />
    </PageContainer>
  );
};

export default LandingPage;
