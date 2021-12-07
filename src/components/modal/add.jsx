import React from 'react';
import { Modal, FormControl, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

const generateOnSubmit = ({ modalInfo, setChannel, hideModal}) => values => {
  const updatedChannel = { ...modalInfo.item, name: values.body };
  setChannel({ type: modalInfo.type, item: updatedChannel });
  hideModal();
};

const addModal =  (props) => {
  const channels = useSelector(state => state.channelsInfo.channels);
  const { hideModal } = props;
  const channelsNames = channels.map(channel => channel.name);
  const formik = useFormik({
    initialValues: { body: ''},
    validationSchema: yup.object().shape({
      body: yup.mixed().notOneOf(channelsNames, 'Должно быть уникальным'),
    }),
    onSubmit: generateOnSubmit(props)
  });
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <Modal show>
    <Modal.Header>
      <Modal.Title>Добавить канал</Modal.Title>
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
          required
        />
        <FormGroup className='mt-2 d-flex justify-content-end'>
          <button className='btn btn-secondary ml-auto' onClick={hideModal}>отменить</button>
          <button type='submit' className='btn btn-primary ml-2'>отправить</button>
        </FormGroup>
      </form>
    </Modal.Body>
  </Modal>;
};

export default addModal;
