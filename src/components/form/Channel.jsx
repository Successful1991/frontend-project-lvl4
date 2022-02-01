import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { hideModal } from '../../store/modal-slice';

const ChannelForm = (props) => {
  const { item = {}, btnOk, handleSubmit } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { entities, ids } = useSelector((state) => state.channels);

  const channelsNames = ids.map((id) => entities[id].name);
  const inputRef = useRef();
  const formik = useFormik({
    initialValues: { name: '', ...item },
    validationSchema: yup.object().shape({
      name: yup.mixed().notOneOf(channelsNames, t('errors.field must be unique')),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup className="mt-2 position-relative">
        <FormControl
          name="name"
          ref={inputRef}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autocomplete={false}
          isInvalid={formik.errors.body}
          aria-label="Имя канала"
          required
        />
        <FormControl.Feedback type="invalid" tooltip>{formik.errors.body}</FormControl.Feedback>
      </FormGroup>
      <FormGroup className="mt-2 d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-primary ms-2 order-1"
        >
          {t(`${btnOk}`)}
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-auto"
          onClick={() => dispatch(hideModal())}
        >
          {t('modals.cancel')}
        </button>
      </FormGroup>
    </form>
  );
};

export default ChannelForm;
