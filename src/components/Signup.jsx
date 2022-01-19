import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Form,
  Button,
  FloatingLabel,
  Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ImageChat from '../../assets/chat.jpg';
import routes from '../routes';
import useAuth from '../hooks';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return auth.loggedIn
    ? <Button onClick={auth.logOut}>{ t('buttons.logOut') }</Button>
    : <Button as={Link} to={routes.loginPage()}>{ t('buttons.logIn') }</Button>;
};

const schema = yup.object().shape({
  username: yup.string()
    .required()
    .trim()
    .min(3, 'errors.length symbol name')
    .max(20, 'errors.length symbol name'),
  password: yup.string()
    .required()
    .trim()
    .min(6, 'errors.min symbol password'),
  passwordConfirmation: yup.string()
    .required()
    .trim()
    .oneOf([yup.ref('password'), null], 'errors.password confirmation'),
});

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [signupFailed, setSignupFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: schema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setSignupFailed(false);
      try {
        const { data } = await axios.post(routes.signUp(), values);
        auth.logIn(data);
        navigate('/');
      } catch (err) {
        if (err.response.status !== 409) {
          throw err;
        }
        setSignupFailed(true);
      }
    },
    displayName: 'signUpForm',
  });

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-around align-items-center col-12 col-md-8 col-xxl-6 mx-auto">
        <Image src={ImageChat} className="w-25 img-fluid" />
        <Form className="w-50" onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">{ t('signUp.title') }</h1>
          <FloatingLabel controlId="nameFloating" label={t('signUp.placeholder username')}>
            <Form.Control
              className="mb-3"
              name="username"
              type="text"
              placeholder={t('signUp.placeholder username')}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.username}
            />
            { formik.errors.username && formik.touched.username
              ? <Form.Control.Feedback type="invalid" tooltip>{t(formik.errors.username)}</Form.Control.Feedback>
              : null}
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label={t('signUp.placeholder password')}>
            <Form.Control
              className="mb-3"
              name="password"
              type="password"
              placeholder={t('signUp.placeholder password')}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.password}
            />
            {formik.errors.password && formik.touched.password
              ? <Form.Control.Feedback type="invalid" tooltip>{t(formik.errors.password)}</Form.Control.Feedback>
              : null}
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPasswordConfirmation"
            label={t('signUp.placeholder password confirmation')}
          >
            <Form.Control
              className="mb-3"
              name="passwordConfirmation"
              type="password"
              placeholder={t('signUp.placeholder password confirmation')}
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.passwordConfirmation}
            />
            {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation
              ? <Form.Control.Feedback type="invalid" tooltip>{t(formik.errors.passwordConfirmation)}</Form.Control.Feedback>
              : null}
          </FloatingLabel>
          <div className="form__group">
            {signupFailed
              ? <span className="form__error">{t('failed signup user')}</span>
              : null}
          </div>
          <Button type="submit" className="w-100">
            { t('signUp.btn') }
          </Button>
        </Form>
      </div>
      <AuthButton />
    </div>
  );
};

export default Signup;
