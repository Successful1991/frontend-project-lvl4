import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { serviceContext } from '../../contexts';
import { hideModal } from '../../store/modal-slice';
import ChannelModal from './Channel';
import ConfirmationModal from './Confirmation';

const mappingModal = {
  adding: ChannelModal,
  renaming: ChannelModal,
  removing: ConfirmationModal,
};

const mappingContentsKey = {
  adding: { title: 'modals.add title', btnOk: 'modals.send' },
  renaming: { title: 'modals.rename title', btnOk: 'modals.send' },
  removing: { title: 'modals.delete title', btnOk: 'modals.delete' },
};

const ModalRoot = ({ modalType, modalProps }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    createChannel,
    renameChannel,
    removeChannel,
  } = useContext(serviceContext);

  const mappingHandler = {
    adding: (values) => {
      const updatedChannel = { ...modalProps, name: values.name };
      return createChannel(updatedChannel, (response) => {
        if (response.status === 'ok') {
          toast.success(t('toast.new channel'), {
            progressClassName: 'success',
            pauseOnHover: false,
          });
          dispatch(hideModal());
        }
      });
    },
    renaming: (values) => {
      const updatedChannel = { ...modalProps.item, name: values.name };
      renameChannel(updatedChannel, (response) => {
        if (response.status === 'ok') {
          toast.success(t('toast.rename channel'), {
            progressClassName: 'success',
            pauseOnHover: false,
          });
          dispatch(hideModal());
        }
      });
    },
    removing: () => {
      removeChannel(modalProps?.item, ({ status }) => {
        if (status === 'ok') {
          toast.success(t('toast.delete channel'), {
            progressClassName: 'success',
            pauseOnHover: false,
          });
          dispatch(hideModal());
        }
      });
    },
  };

  if (!modalType) return null;

  const SpecificModal = mappingModal[modalType];
  // eslint-disable-next-line react/jsx-props-no-spreading,max-len
  return <SpecificModal {...modalProps} {...mappingContentsKey[modalType]} handleSubmit={mappingHandler[modalType]} />;
};

export default ModalRoot;
