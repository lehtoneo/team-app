import React, { useState } from 'react';
import useSaveEventAttendance from '../../hooks/useEvent/useSaveEventAttendance';
import {
  ConfirmDialogType,
  ConfirmState
} from '../../redux/reducers/confirmDialogReducer';
import Button from '../Button';
import CheckBox from '../forms/components/CheckBox';
import StyledModal from './StyledModal';

export type SignInUpModalState = 'sign-in' | 'sign-up';

interface ConfirmModalProps {
  onConfirm: (
    dontShowAgainEnabled: boolean,
    dialType?: ConfirmDialogType
  ) => any;
  onCancel: () => any;
  isOpen: boolean;
  confirmState: ConfirmState;
}

const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const [dontShowAgainCheck, setDontShowAgainCheck] = useState(false);
  return (
    <StyledModal
      style={{ overlay: { zIndex: 5000 } }}
      className="mx-auto xs:w-3/4 md:w-2/4 fixed inset-x-0 top-10 bg-white border-2 border-gray z-5000"
      isOpen={props.isOpen}
      onRequestClose={props.onCancel}
      appElement={document.getElementById('root') as HTMLElement}
    >
      <div className="p-5">
        <div className="flex justify-center text-lg">
          {props.confirmState.text}
        </div>
        <div>
          {props.confirmState.currentDialogType !== undefined && (
            <CheckBox
              label="Don't show again on this session"
              value={dontShowAgainCheck}
              onValueChange={(val) => setDontShowAgainCheck(val)}
            />
          )}
        </div>
        <div className="p-5">
          <div className="flex">
            <Button
              color="red"
              onClick={() =>
                props.onConfirm(
                  dontShowAgainCheck,
                  props.confirmState.currentDialogType
                )
              }
            >
              Ok
            </Button>
            <div className="w-10"></div>
            <Button onClick={props.onCancel}>Cancel</Button>
          </div>
        </div>
      </div>
    </StyledModal>
  );
};

export default ConfirmModal;
