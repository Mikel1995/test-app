import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmModal = (props) => {
  const {
    className,
    isOpen, confrimCallBack, cancelCallBack
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Are You Sure you want to delete User?</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={confrimCallBack}>Yes</Button>{' '}
          <Button color="secondary" onClick={cancelCallBack}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ConfirmModal;