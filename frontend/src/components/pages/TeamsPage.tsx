import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import Button from '../Button';
import Header from '../Header';
import CreateTeamModal from '../modals/CreateTeamModal';
import PageContainer from './components/PageContainer';

const TeamsPage = () => {
  const { currentUser } = useCurrentUser();
  const [createTeamModalOpen, setCreateTeamModalOpen] =
    useState<boolean>(false);
  if (!currentUser) {
    throw Error('SHOULD NOT BE HERE');
  }
  return (
    <>
      <CreateTeamModal
        isOpen={createTeamModalOpen}
        onClose={() => setCreateTeamModalOpen(false)}
      />
      <PageContainer>
        <Header>Teams</Header>
        <div className="my-2"></div>
        <Link to="own">
          <Button>My teams</Button>
        </Link>
        <div className="my-4"></div>
        <Button onClick={() => setCreateTeamModalOpen(true)} color="green">
          Create a new team
        </Button>
      </PageContainer>
    </>
  );
};

export default TeamsPage;
