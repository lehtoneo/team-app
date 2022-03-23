import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { CreateUserInput } from '../../graphql/mutations/createUser';
import { SignInInput } from '../../graphql/mutations/signIn';
import useCreateUser from '../../hooks/useCreateUser';
import useSignIn from '../../hooks/useSignIn';
import SignInForm from '../forms/SignInForm';
import SignUpForm from '../forms/SignUpForm';

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
      <div className="flex justify-end p-2">
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="authentication-modal"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
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
