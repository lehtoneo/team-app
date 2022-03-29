import React from 'react';
import { Link } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import Button from '../Button';
import Header from '../Header';
import PageContainer from './components/PageContainer';

const TeamsPage = () => {
  const { currentUser } = useCurrentUser();
  if (!currentUser) {
    throw Error('SHOULD NOT BE HERE');
  }
  return (
    <PageContainer>
      <Header>Teams</Header>
      <div className="my-2"></div>
      <div className="flex-row md:px-40 lg:px-80 sm:px-10">
        <Link to="own">
          <Button>My teams</Button>
        </Link>
        <div className="my-2"></div>
        <Link to="join">
          <Button>Join a team!</Button>
        </Link>
        <div className="my-4"></div>
        <Link to="create">
          <Button color="green">Create a new team</Button>
        </Link>
      </div>
    </PageContainer>
  );
};

export default TeamsPage;
