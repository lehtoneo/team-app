import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { CreateTeamInput } from '../../graphql/mutations/team/createTeam';
import useCreateTeam from '../../hooks/useTeam/useCreateTeam';
import CreateTeamForm from '../forms/CreateTeamForm';

import ModalHeader from './ModalHeader';

export type SignInUpModalState = 'sign-in' | 'sign-up';

interface IModalProps {
  isOpen: boolean;
  onClose: () => any;
  onSignUpCompleted?: () => any;
}

interface ILoginModalProps extends IModalProps {
  onCreateAccountClick?: () => any;
  modalState?: SignInUpModalState;
}

const CreateTeamModal = ({ isOpen, onClose, modalState }: ILoginModalProps) => {
  const navigate = useNavigate();
  const { createTeam, error } = useCreateTeam();
  const handleSubmit = async (values: CreateTeamInput) => {
    const { success, team } = await createTeam(values);

    if (success) {
      toast(`Team "${team.name}" created!`, { type: 'success' });
      onClose();
      navigate(`/teams/${team.id}`);
    } else {
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={document.getElementById('root') as HTMLElement}
    >
      <ModalHeader onClose={onClose} />
      <CreateTeamForm onSubmit={handleSubmit} error={error?.message} />
    </Modal>
  );
};

export default CreateTeamModal;
