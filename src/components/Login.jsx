import React, {useState, useEffect, useRef, useContext} from 'react';
import { useFormik } from 'formik';
import {Form, Button, FloatingLabel} from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes';
import { authContext } from '../contexts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const auth = useContext(authContext);
  const [isAuthField, setAuthField] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
      initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async values => {
      setAuthField(false);
      try {
        const { data } = await axios.post(routes.login(), values);
        auth.setUserId(data);
        auth.logIn();
        const { pathname } = location.state || { pathname: routes.homePage() };
        navigate(pathname);
      } catch (e) {
        setAuthField(true);
        inputRef.current.focus();
      }
    },
  });

  return (<Form className='col-md-6 mx-auto' onSubmit={formik.handleSubmit}>
      <legend className='mb-4'>{ t('logIn.title') }</legend>
      <Form.Group controlId="username" className='mb-3 form-group'>
        <FloatingLabel controlId="floatingUsername" label={t('logIn.placeholder username')}>
        <Form.Control
          className='form-control'
          type='text'
          name='username'
          onChange={formik.handleChange}
          placeholder={t('logIn.placeholder username')}
          ref={inputRef}
          isInvalid={isAuthField}
          required
        />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="password" className='mb-3 form-group'>
        <FloatingLabel controlId="floatingPassword" label={t('logIn.placeholder password')}>
        <Form.Control
          className='form-control'
          type='password'
          name='password'
          placeholder={t('logIn.placeholder password')}
          onChange={formik.handleChange}
          isInvalid={isAuthField}
          required
        />
        </FloatingLabel>
        <Form.Control.Feedback className='invalid-tooltip' type='invalid' tooltip={true}>
          { t('errors.login or password') }
        </Form.Control.Feedback>
      </Form.Group>
      <Button className='btn-outline-primary btn-light' type='submit'>{ t('logIn.btn') }</Button>
    </Form>);
};

export default Login;
