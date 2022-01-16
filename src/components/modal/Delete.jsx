import React, { useEffect, useRef } from 'react';
import { FormGroup, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const RemoveModal = ({ modalInfo, hideModal, setChannel }) => {
  const { t } = useTranslation();
  const inputRef = useRef();

  const submitHandler = () => {
    setChannel(modalInfo, ({ status }) => {
      if (status === 'ok') {
        toast.success(t('toast.remove channel'), {
          progressClassName: 'success',
          pauseOnHover: false,
        });
        hideModal();
      }
    });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>{ t('modals.remove title') }</Modal.Title>
        <button
          type="button"
          className="btn"
          onClick={hideModal}
        >
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
        <p>{ t('modals.remove description') }</p>
        <form onSubmit={submitHandler}>
          <FormGroup className="d-flex justify-content-end">
            <button type="submit" ref={inputRef} className="btn btn-danger ms-2 order-1">{t('modals.remove')}</button>
            <button type="button" className="btn btn-primary ms-2" onClick={hideModal}>{t('modals.cancel')}</button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
