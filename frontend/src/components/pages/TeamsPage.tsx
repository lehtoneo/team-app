import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';
import Header from '../Header';
import PageContainer from './components/PageContainer';

const TeamsPage = () => {
  return (
    <PageContainer>
      <Header>Teams</Header>
      <div className="my-2"></div>
      <Link to="own">
        <Button>My teams</Button>
      </Link>
      <div className="my-4"></div>
      <Link to="create">
        <Button color="green">Create a new team</Button>
      </Link>
    </PageContainer>
  );
};

export default TeamsPage;
