import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { CreateUserInput } from '../../graphql/mutations/createUser';
import { SignInInput } from '../../graphql/mutations/signIn';
import useCreateUser from '../../hooks/useCreateUser';
import useSignIn from '../../hooks/useSignIn';
import SignInForm from '../forms/SignInForm';
import SignUpForm from '../forms/SignUpForm';
import ModalHeader from './ModalHeader';
import StyledModal from './StyledModal';

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

const SignInUpModal = ({ isOpen, onClose, modalState }: ILoginModalProps) => {
  const [internalModalState, setInternalModalState] =
    useState<SignInUpModalState>(modalState || 'sign-in');

  const { createUser } = useCreateUser();
  const { signIn } = useSignIn();
  useEffect(() => {
    if (modalState) {
      setInternalModalState(modalState);
    }
  }, [modalState]);

  const handleSignUp = async (values: CreateUserInput) => {
    await createUser(values);
    onClose();
  };

  const handleSignIn = async (values: SignInInput) => {
    await signIn(values);
    onClose();
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={document.getElementById('root') as HTMLElement}
    >
      {internalModalState === 'sign-in' ? (
        <SignInForm
          onSubmit={handleSignIn}
          onCreateAccountClick={() => setInternalModalState('sign-up')}
        />
      ) : (
        <SignUpForm
          onSubmit={handleSignUp}
          onSignInClick={() => setInternalModalState('sign-in')}
        />
      )}
    </StyledModal>
  );
};

export default SignInUpModal;
