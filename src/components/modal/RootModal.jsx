import React from 'react';
import { useSelector } from 'react-redux';
import ChannelModal from './RenameChannel';
import AddChannel from './AddChannel';
import ConfirmationModal from './DeleteChannel';

const mappingModal = {
  adding: AddChannel,
  renaming: ChannelModal,
  removing: ConfirmationModal,
};

const mappingContentsKey = {
  adding: { title: 'modals.add title', btnOk: 'modals.send' },
  renaming: { title: 'modals.rename title', btnOk: 'modals.send' },
  removing: { title: 'modals.delete title', btnOk: 'modals.delete' },
};

const ModalRoot = () => {
  const { type: modalType, props: modalProps } = useSelector((state) => state.modal);

  if (!modalType) return null;

  const SpecificModal = mappingModal[modalType];
  // eslint-disable-next-line react/jsx-props-no-spreading,max-len
  return <SpecificModal {...modalProps} {...mappingContentsKey[modalType]} />;
};

export default ModalRoot;
