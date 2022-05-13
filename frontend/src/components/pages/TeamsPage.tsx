import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Button from '../Button';
import Header from '../Header';
import PageContainer from './components/PageContainer';
import ModalHeader from '../modals/ModalHeader';

const TeamsPage = () => {
  const [joinTeamModalOpen, setJoinTeamModalOpen] = useState<boolean>(false);
  const handleClose = () => {
    setJoinTeamModalOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={joinTeamModalOpen}
        onRequestClose={handleClose}
        appElement={document.getElementById('root') as HTMLElement}
      >
        <ModalHeader onClose={handleClose} />
        To join a team, you need a join link. Ask this link from a admin of the
        team. Use the link in your browser to join the team.
      </Modal>
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
