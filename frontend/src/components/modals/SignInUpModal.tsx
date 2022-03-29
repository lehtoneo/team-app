import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { CreateUserInput } from '../../graphql/mutations/createUser';
import { SignInInput } from '../../graphql/mutations/signIn';
import useCreateUser from '../../hooks/useCreateUser';
import useSignIn from '../../hooks/useSignIn';
import SignInForm from '../forms/SignInForm';
import SignUpForm from '../forms/SignUpForm';
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
    const tokens = await createUser(values);
    onClose();
  };

  const handleSignIn = async (values: SignInInput) => {
    const signInResult = await signIn(values);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={document.getElementById('root') as HTMLElement}
    >
      <ModalHeader onClose={onClose} />
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
    </Modal>
  );
};

export default SignInUpModal;
