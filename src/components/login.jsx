import React, {useState, useEffect, useRef, useContext} from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import cn from 'classnames';
import axios from 'axios';
import routes from '../routes';
import * as yup from 'yup';
import authContext from '../contexts';
import {useLocation, useNavigate} from 'react-router-dom';

const passRegExp = /(.*\d)(a-z)/;
const validateSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(3).matches(passRegExp),
});

const Login = () => {
  const auth = useContext(authContext);
  const [isAuthField, setAuthField] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);


  // return <Formik
  //   initialValues= {{
  //     name: '',
  //     password: '',
  //   }}
  //   validationSchema= {validateSchema}
  //   onSubmit= {async values => {
  //     setAuthField(false);
  //     try {
  //       const { res } = await axios.post(routes.loginPath(), values);
  //       const { token } = JSON.parse(res);
  //       localStorage.setItem('userId', token);
  //       auth.logIn();
  //       const { from } = location.state || { from: { pathname: '/' } };
  //       navigate(from);
  //     } catch (e) {
  //       setAuthField(true);
  //       inputRef.current.focus();
  //     }
  //   }}
  //   >{
  //     ({
  //       handleSubmit,
  //       handleChange,
  //       touched,
  //       errors
  //   }) => (
  //     <Form className='col-md-6' onSubmit={handleSubmit}>
  //       <legend className='mb-4'>Войти</legend>
  //       <Form.Group controlId="name" className='mb-3 form-group form-floating'>
  //         <Form.Label>your name</Form.Label>
  //         <Form.Control
  //           className='form-control'
  //           type='text'
  //           name='name'
  //           onChange={handleChange}
  //           placeholder='login'
  //           ref={inputRef}
  //           isInvalid={isAuthField}
  //           required
  //         />
  //       </Form.Group>
  //       <Form.Group controlId="password" className='mb-3 form-group form-floating'>
  //         <Form.Label>password</Form.Label>
  //         <Form.Control
  //           className='form-control'
  //           type='password'
  //           name='password'
  //           placeholder='password'
  //           onChange={handleChange}
  //           isInvalid={isAuthField}
  //           required
  //         />
  //         <Form.Control.Feedback className='invalid-tooltip' type='invalid' tooltip={true}/>
  //       </Form.Group>
  //       <Button className='btn-outline-primary btn-light' type='submit'>Войти</Button>
  //     </Form>
  //   )
  // }</Formik>
  const formik = useFormik({
      initialValues: {
      username: '',
      password: '',
    },
    // validationSchema: {validateSchema},
    onSubmit: async values => {
      setAuthField(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        const { pathname } = location.state || { pathname: '/' };
        navigate(pathname);
      } catch (e) {
        setAuthField(true);
        inputRef.current.focus();
      }
    },
  });

  return (<Form className='col-md-6' onSubmit={formik.handleSubmit}>
          <legend className='mb-4'>Войти</legend>
          <Form.Group controlId="username" className='mb-3 form-group form-floating'>
            <Form.Label>your name</Form.Label>
            <Form.Control
              className='form-control'
              type='text'
              name='username'
              onChange={formik.handleChange}
              placeholder='login'
              ref={inputRef}
              isInvalid={isAuthField}
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className=' mb-3 form-group form-floating'>
            <Form.Label>password</Form.Label>
            <Form.Control
              className='form-control'
              type='password'
              name='password'
              placeholder='password'
              onChange={formik.handleChange}
              isInvalid={isAuthField}
              required
            />
            <Form.Control.Feedback className='invalid-tooltip' type='invalid' tooltip={true}>
              Логин или пароль указанны неверно
            </Form.Control.Feedback>
          </Form.Group>
          <Button className='btn-outline-primary btn-light' type='submit'>Войти</Button>
    </Form>);
};

export default Login;
