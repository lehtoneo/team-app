import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Header from '../Header';
import PageContainer from './components/PageContainer';
import StyledModal from '../modals/StyledModal';

const TeamsPage = () => {
  const [joinTeamModalOpen, setJoinTeamModalOpen] = useState<boolean>(false);
  const handleClose = () => {
    setJoinTeamModalOpen(false);
  };
  return (
    <>
      <StyledModal
        isOpen={joinTeamModalOpen}
        onRequestClose={handleClose}
        appElement={document.getElementById('root') as HTMLElement}
      >
        To join a team, you need a join link. Ask this link from a admin of the
        team. Use the link in your browser to join the team.
      </StyledModal>
      <PageContainer>
        <Header>Teams</Header>
        <div className="my-2"></div>
        <Link to="own">
          <Button>My teams</Button>
        </Link>
        <div className="my-4"></div>
        <Button color="blue" onClick={() => setJoinTeamModalOpen(true)}>
          Join a team
        </Button>
        <div className="my-4"></div>
        <Link to="create">
          <Button color="green">Create a new team</Button>
        </Link>
      </PageContainer>
    </>
  );
};

export default TeamsPage;
