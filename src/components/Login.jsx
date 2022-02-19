import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { useFormik } from 'formik';
import {
  Form,
  Button,
  FloatingLabel,
  Image,
} from 'react-bootstrap';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ImageLogin from '../../assets/login.jpg';
import routes from '../routes';
import { authContext } from '../contexts';
import useAuth from '../hooks';

const SignUpButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return auth.loggedIn
    ? null
    : <Link className="me-2" to={routes.signUpPage()}>{ t('buttons.signUp') }</Link>;
};

const Login = () => {
  const { t } = useTranslation();
  const auth = useContext(authContext);
  const [authFailed, setAuthFailed] = useState(false);
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
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.login(), values);
        auth.logIn(data);
        const { pathname } = location.state || { pathname: routes.homePage() };
        navigate(pathname);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        } else {
          throw err;
        }
      }
    },
  });

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <Image src={ImageLogin} className="rounded-circle" />
            </div>
            <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">{ t('logIn.title') }</h1>
              <Form.Group controlId="username" className="mb-3 form-group">
                <FloatingLabel controlId="floatingUsername" label={t('logIn.placeholder username')}>
                  <Form.Control
                    className="form-control"
                    type="text"
                    name="username"
                    autoComplete="off"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    placeholder={t('logIn.placeholder username')}
                    ref={inputRef}
                    isInvalid={authFailed}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="password" className="mb-3 form-group">
                <FloatingLabel controlId="floatingPassword" label={t('logIn.placeholder password')}>
                  <Form.Control
                    className="form-control"
                    type="password"
                    name="password"
                    autoComplete="off"
                    value={formik.values.password}
                    placeholder={t('logIn.placeholder password')}
                    onChange={formik.handleChange}
                    isInvalid={authFailed}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <div className="form__group">
                {authFailed
                  ? <span className="form__error">{t('errors.login or password')}</span>
                  : null}
              </div>
              <Button type="submit" className="btn-outline-primary btn-light">{t('logIn.btn')}</Button>
            </Form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span>
              <SignUpButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
