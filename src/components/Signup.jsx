import React, { useCallback } from 'react';
import { withFormik } from 'formik';
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

const createSchema = (t) => yup.object().shape({
  username: yup.string()
    .required()
    .trim()
    .min(3, t('errors.length symbol name'))
    .max(20, t('errors.length symbol name')),
  password: yup.string()
    .required()
    .trim()
    .min(6, t('errors.min symbol password')),
  passwordConfirmation: yup.string()
    .required()
    .trim()
    .oneOf([yup.ref('password'), null], t('errors.password confirmation')),
});

const SignUpForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  return (
    <Form className="w-50" onSubmit={handleSubmit}>
      <h1 className="text-center mb-4">{ t('signUp.title') }</h1>
      <FloatingLabel controlId="nameFloating" label={t('signUp.placeholder username')}>
        <Form.Control
          className="mb-3"
          name="username"
          type="text"
          placeholder={t('signUp.placeholder username')}
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={!!errors.username}
        />
        { errors.username && touched.username
          ? <Form.Control.Feedback type="invalid" tooltip>{errors.username}</Form.Control.Feedback>
          : null}
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label={t('signUp.placeholder password')}>
        <Form.Control
          className="mb-3"
          name="password"
          type="password"
          placeholder={t('signUp.placeholder password')}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={!!errors.password}
        />
        {errors.password && touched.password
          ? <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
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
          value={values.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={!!errors.passwordConfirmation}
        />
        {errors.passwordConfirmation && touched.passwordConfirmation
          ? <Form.Control.Feedback type="invalid" tooltip>{errors.passwordConfirmation}</Form.Control.Feedback>
          : null}
      </FloatingLabel>
      <Button type="submit" className="w-100">
        { t('signUp.btn') }
      </Button>
    </Form>
  );
};

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const Schema = useCallback(createSchema);
  const { t } = useTranslation();

  const WithFormik = withFormik({
    mapPropsToValues: () => ({
      username: '',
      password: '',
      passwordConfirmation: '',
    }),
    validationSchema: Schema(t),
    validateOnBlur: true,
    handleSubmit: async (values, { setErrors }) => {
      try {
        const { data } = await axios.post(routes.signUp(), values);
        auth.setUserId(data);
        auth.logIn();
        navigate('/');
      } catch (err) {
        if (err.response.status !== 409) {
          throw err;
        }
        setErrors({
          username: ' ',
          password: ' ',
          passwordConfirmation: 'Такой пользователь уже существует',
        });
      }
    },
    displayName: 'signUpForm',
  })(SignUpForm);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-around align-items-center col-12 col-md-8 col-xxl-6 mx-auto">
        <Image src={ImageChat} className="w-25 img-fluid" />
        <WithFormik />
      </div>
      <AuthButton />
    </div>
  );
};

export default Signup;
