import React, {useEffect, useRef} from 'react';
import { FormGroup, Modal} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

const generateOnSubmit = ({ modalInfo, hideModal, setChannel }) => e => {
  e.preventDefault();

  setChannel(modalInfo);
  hideModal();
};

const removeModal = props => {
  const { t } = useTranslation();
  const { hideModal } = props;
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <Modal show >
    <Modal.Header>
      <Modal.Title>{ t('modals.remove title') }</Modal.Title>
      <button className="btn" onClick={hideModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             className="bi bi-x-lg" viewBox="0 0 16 16">
          <path fillRule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
          <path fillRule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
        </svg>
      </button>
    </Modal.Header>

    <Modal.Body>
      <p>{ t('modals.remove description') }</p>
      <form onSubmit={generateOnSubmit(props)}>
        <FormGroup className='d-flex justify-content-end'>
          <button type="submit" ref={inputRef} className='btn btn-danger ms-2 order-1' >{ t('modals.remove') }</button>
          <button className='btn btn-primary ms-2' onClick={hideModal}>{ t('modals.cancel') }</button>
        </FormGroup>
      </form>
    </Modal.Body>
  </Modal>;
};

export default removeModal;
