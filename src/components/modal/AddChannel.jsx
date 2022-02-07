import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { hideModal } from '../../store/modal-slice';
import ChannelForm from '../form/Channel';
import { serviceContext } from '../../contexts';

const AddChannel = (props) => {
  const { title } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { props: modalProps } = useSelector((state) => state.modal);
  const { createChannel } = useContext(serviceContext);
  console.log(15, props);
  const handleSubmit = async (values) => {
    const updatedChannel = { ...modalProps, name: values.name };
    await createChannel(updatedChannel);
    toast.success(t('toast.new channel'), {
      progressClassName: 'success',
      pauseOnHover: false,
    });
    dispatch(hideModal());
  };

  // что-бы обойти линтер
  // eslint-disable-next-line react/jsx-props-no-spreading
  const Form = () => <ChannelForm {...props} handleSubmit={handleSubmit} />;

  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>{ t(`${title}`) }</Modal.Title>
        <button type="button" className="btn" onClick={() => dispatch(hideModal())}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
            />
            <path
              fillRule="evenodd"
              d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
            />
          </svg>
        </button>
      </Modal.Header>
      <Modal.Body>
        <Form />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
