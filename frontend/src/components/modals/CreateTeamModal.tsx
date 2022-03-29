import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { toast } from 'react-toastify';

import { CreateTeamInput } from '../../graphql/mutations/createTeam';
import useCreateTeam from '../../hooks/useCreateTeam';
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
  const { createTeam, error } = useCreateTeam();
  const handleSubmit = async (values: CreateTeamInput) => {
    const { success, team } = await createTeam(values);

    if (success) {
      toast(`Team "${team.name}" created!`, { type: 'success' });
      onClose();
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
