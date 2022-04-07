import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { CreateUserInput } from '../../graphql/mutations/createUser';
import { SignInInput } from '../../graphql/mutations/signIn';
import useCreateUser from '../../hooks/useCreateUser';
import useSignIn from '../../hooks/useSignIn';
import { ConfirmState } from '../../redux/reducers/confirmDialogReducer';
import Button from '../Button';
import SignInForm from '../forms/SignInForm';
import SignUpForm from '../forms/SignUpForm';
import Header from '../Header';
import ModalHeader from './ModalHeader';

export type SignInUpModalState = 'sign-in' | 'sign-up';

interface ConfirmModalProps {
  onConfirm: () => any;
  onCancel: () => any;
  isOpen: boolean;
  confirmState: ConfirmState;
}

const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  return (
    <Modal
      className="mx-auto xs:w-3/4 md:w-2/4 fixed inset-x-0 top-10 bg-white border-2 border-gray"
      isOpen={props.isOpen}
      appElement={document.getElementById('root') as HTMLElement}
    >
      <div className="p-5">
        <div className="flex justify-center text-lg">
          {props.confirmState.text}
        </div>
        <div className="p-5">
          <div className="flex">
            <Button color="red" onClick={props.onConfirm}>
              Ok
            </Button>
            <div className="w-10"></div>
            <Button onClick={props.onCancel}>Cancel</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
