import React, { Component } from 'react';
import {Formik, Field, FastField, ErrorMessage, Form} from 'formik';
import cn from 'classnames';
import * as yup from 'yup';

const passRegExp = /(.*\d)(a-z)/;
const validateTheme = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required().min(6).matches(passRegExp),
});

class Login extends Component {
  render() {
    return (<div>
      <Formik
        initialValues={{
          name: '', password: '',
        }}
        validationSchema={validateTheme}
        onSubmit={() => {}}>
        {({ isSubmitting }) => (
          <Form className='col-md-6'>
            <legend className='mb-4'>Войти</legend>
            <div className='mb-3 form-group form-floating'>
              <label>your name</label>
              <FastField className='form-control' type='text' name='name'></FastField>
              <ErrorMessage className='invalid-tooltip' name='name' component='div'/>
            </div>
            <div className='mb-3 form-group form-floating'>
              <label>password</label>
              <Field className='form-control' type='password' name='password'></Field>
              <ErrorMessage className='invalid-tooltip' name='password' component='div'/>
            </div>
            <button className='w-100 btn btn-outline-primary' type='submit' disabled={isSubmitting}>Войти</button>
          </Form>
        )}
      </Formik>
    </div>);
  }
}

export default Login;
