import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

const generateOnSubmit = ({ modalInfo, hideModal, setChannel }) => values => {
  const updatedChannel = { ...modalInfo.item, name: values.body };
  setChannel({ type: modalInfo.type, item: updatedChannel }, () => {
    toast.success(t('toast.rename channel'), {
      progressClassName: 'success',
      pauseOnHover: false
    });
    hideModal();
  });
};

const renameModal = (props) => {
  const { t } = useTranslation();
  const { entities, ids } = useSelector(state => state.channels);
  const { modalInfo, hideModal } = props;

  const channelsNames = ids.map(id => entities[id].name);
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: { body: modalInfo.item.name},
    validationSchema: yup.object().shape({
      body: yup.mixed().notOneOf(channelsNames, t('errors.field must be unique')),
    }),
    onSubmit: values => {
      generateOnSubmit(props)(values);
    }
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <Modal show >
    <Modal.Header>
      <Modal.Title>{ t('modals.rename title') }</Modal.Title>
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
      <form onSubmit={formik.handleSubmit}>
          <FormControl
            name='body'
            ref={inputRef}
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.errors.body}
            aria-label="Имя канала"
            required
          />
          <FormControl.Feedback  type='invalid' tooltip >{formik.errors.body}</FormControl.Feedback>
          <FormGroup className='mt-2 d-flex justify-content-end'>
            <button
              type='submit'
              role="button"
              className='btn btn-primary ms-2 order-1'
            >{t('modals.send')}</button>
            <button className='btn btn-secondary ' onClick={hideModal}>{ t('modals.cancel') }</button>
          </FormGroup>
      </form>
    </Modal.Body>
  </Modal>;
};

export default renameModal;
