import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { hideModal } from '../../store/modal-slice';
import ChannelForm from '../form/Channel';

const ChannelModal = (props) => {
  const { title } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // что-бы обойти линтер
  // eslint-disable-next-line react/jsx-props-no-spreading
  const Form = () => <ChannelForm {...props} />;

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

export default ChannelModal;
