import React from 'react';
import {Modal, FormControl, FormGroup, Form} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const addModal = ({ modalInfo, setChannel, hideModal}) => {
  const { t } = useTranslation();
  const { entities, ids } = useSelector(state => state.channels);

  const channelsNames = ids.map(id => entities[id].name);
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: { body: ''},
    validationSchema: yup.object().shape({
      body: yup.mixed().notOneOf(channelsNames, t('errors.field must be unique')),
    }),
    onSubmit: values => {
      const updatedChannel = { ...modalInfo.item, name: values.body };
      setChannel({ type: modalInfo.type, item: updatedChannel }, response => {
        if (response.status === 'ok') {
          toast.success(t('toast.new channel'), {
            progressClassName: 'success',
            pauseOnHover: false
          });
          hideModal();
        } else {
          toast.success(t('errors.new channel'), {
            progressClassName: 'failed',
            pauseOnHover: false
          });
        }

      });
    }
  });


  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <Modal show>
    <Modal.Header>
      <Modal.Title>{ t('modals.add title') }</Modal.Title>
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
        <FormGroup className='mt-2 position-relative'>
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
        </FormGroup>
        <FormGroup className='mt-2 d-flex justify-content-end'>
          <button
            type='submit'
            role="button"
            className='btn btn-primary ms-2 order-1'
          >{t('modals.send')}</button>
          <button className='btn btn-secondary ml-auto' onClick={hideModal}>{ t('modals.cancel') }</button>
        </FormGroup>
      </form>
    </Modal.Body>
  </Modal>;
};

export default addModal;
