import React from 'react';
import {withFormik} from 'formik';
import { Form, Button, FloatingLabel, Image } from 'react-bootstrap';
import ImageChat from '../../assets/chat.jpg';
import * as yup from 'yup';
import axios from 'axios';

const handlerSubmit = async values => {
  try {
    await axios.post('');
  } catch (err) {

  }
};

const Schema = yup.object().shape({
  name: yup.string().required().trim().min(3),
  password: yup.string().required().trim().min(6),
  passwordConfirmation: yup.string().required().trim().min(6).oneOf([yup.ref('password')], null),
});

const SignUpForm = ({
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit
}) => (<Form className="w-50" onSubmit={handleSubmit}>
  <h1 className="text-center mb-4">Регистрация</h1>
  <FloatingLabel controlId="nameFloating" label="name">
    <Form.Control
      className="mb-3"
      name="name"
      type="text"
      placeholder="введите логин"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      isInvalid={!!errors.name}
    />
    { errors.name && touched.name
      ? <Form.Control.Feedback type='invalid' tooltip >{errors.name}</Form.Control.Feedback>
      : null}
  </FloatingLabel>
  <FloatingLabel controlId="floatingPassword" label="password">
    <Form.Control
      className="mb-3"
      name="password"
      type="password"
      placeholder="пароль"
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
      isInvalid={!!errors.password}
    />
    {errors.password && touched.password
      ? <Form.Control.Feedback type='invalid' tooltip >{errors.password}</Form.Control.Feedback>
      : null}
  </FloatingLabel>
  <FloatingLabel  controlId="floatingPasswordConfirmation" label="passwordConfirmation">
    <Form.Control
      className="mb-3"
      name="passwordConfirmation"
      type="password"
      placeholder="подтвердите пароль"
      value={values.passwordConfirmation}
      onChange={handleChange}
      onBlur={handleBlur}
      isInvalid={!!errors.passwordConfirmation}
    />
    {errors.passwordConfirmation && touched.passwordConfirmation
      ? <Form.Control.Feedback type='invalid' tooltip >{errors.passwordConfirmation}</Form.Control.Feedback>
      : null}
  </FloatingLabel>
  <Button type="submit" className="w-100" >
    зарегистрировать
  </Button>
</Form>
);

const SignUp = () => {
  const WithFormik = withFormik({
    mapPropsToValues: () => ({
      name: '',
      password: '',
      passwordConfirmation: ''
    }),
    validationSchema: Schema,
    validateOnBlur: true,
    onSubmit: handlerSubmit,
    displayName: 'signUpForm',
  })(SignUpForm);

  return <div className="container-fluid">
    <div className="d-flex justify-content-around align-items-center col-12 col-md-8 col-xxl-6 mx-auto">
      <Image src={ImageChat} className="w-25 img-fluid" />
      {<WithFormik/>}
    </div>
  </div>;
};

export default SignUp;
