import React, { useState } from 'react';
import Modal from 'react-modal';
import ModalHeader from './ModalHeader';

interface StyledModalProps extends Modal.Props {}

const StyledModal: React.FC<StyledModalProps> = (props) => {
  return (
    <Modal
      style={{
        content: {
          border: '0',
          borderRadius: '4px',
          bottom: 'auto',
          minHeight: '10rem',
          left: '50%',
          padding: '2rem',
          position: 'fixed',
          right: 'auto',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          minWidth: '20rem',
          width: '80%',
          maxWidth: '60rem'
        },
        overlay: {
          zIndex: 1,
          background: 'rgba(0,0,0,0.5)'
        }
      }}
      appElement={document.getElementById('root') as HTMLElement}
      {...props}
    >
      <ModalHeader onClose={props.onRequestClose} />
      {props.children}
    </Modal>
  );
};

export default StyledModal;
