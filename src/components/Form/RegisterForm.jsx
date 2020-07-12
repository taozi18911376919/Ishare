import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import css from '@Assets/sass/custom.sass';

import SignAction from '@Actions/sign';
import FloatLabelInput from '@Components/Base/FloatLabelInput';

const useStyles = createUseStyles(({
  title: {
    fontSize: 40,
    lineHeight: 1,
    color: '#484848',
    marginBottom: 16,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    lineHeight: 1.25,
    textAlign: 'center',
    marginBottom: 24,
  },
  field: {
    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },
  agree: {
    display: 'flex',
    fontSize: '0.875rem',
    alignItems: 'flex-start',
    color: '#929292',
    '& > input': {
      position: 'relative',
      top: 1,
      marginRight: 8,
    },
    '& a': {
      color: '#1877f2',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}), {
  name: 'RegisterForm',
});

const RegisterForm = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    values,
    handleSubmit,
    handleChange,
    isSubmitting,
    errors: formikErrors,
    touched,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      agree: '',
    },
    validate: formData => {
      const error = {};
      if (!formData.email) {
        error.email = 'The email field is required.';
      }
      if (!formData.password) {
        error.password = 'The password field is required.';
      }
      if (!formData.name) {
        error.name = 'The name field is required.';
      }
      if (!formData.agree) {
        error.agree = 'Please agree the terms';
      }
      return error;
    },
    onSubmit: (formData, formikBag) => {
      dispatch(SignAction.signup(formData, formikBag));
    },
    displayName: 'SignUpForm',
  });

  const showError = field => {
    if (touched[field] && formikErrors[field]) {
      return (
        <p className={classNames(css.help, css['is-danger'])}>{formikErrors[field]}</p>
      );
    }
    return null;
  };

  return (
    <>
      <h3 className={classNames(classes.title)}>ishare</h3>
      <p className={classNames(classes.subTitle)}>A place to shark konwledge and better understand the world</p>
      <div className={classNames(css.columns)}>
        <div className={classNames(css.column, css['is-10'], css['is-offset-1'])}>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <div className={classNames(css.field, classes.field)}>
              <div className={classNames(css.control)}>
                <FloatLabelInput
                  placeholder='Name'
                  name='name'
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
              {showError('name')}
            </div>
            <div className={classNames(css.field, classes.field)}>
              <div className={classNames(css.control)}>
                <FloatLabelInput
                  placeholder='Email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              {showError('email')}
            </div>
            <div className={classNames(css.field, classes.field)}>
              <div className={classNames(css.control)}>
                <FloatLabelInput
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              {showError('password')}
            </div>
            <div className={classNames(css.field, classes.field)}>
              <div className={classNames(css.control)}>
                <label className={classNames(css.checkbox, classes.agree)}>
                  <input type='checkbox' name='agree' value={values.agree} onChange={handleChange} />
                  <span>By Signing up you indicate that you have read and agree to <a>Terms of service</a> and <a>Privacy policy.</a></span>
                </label>
              </div>
              {showError('agree')}
            </div>
            <div className={classNames(css.field, classes.field)}>
              <div className={classNames(css.control)}>
                <button
                  type='submit'
                  className={classNames({
                    [css.button]: true,
                    [css['is-fullwidth']]: true,
                    [css['is-medium']]: true,
                    [css['is-primary']]: true,
                    [css['is-rounded']]: true,
                    [css['is-loading']]: isSubmitting,
                  })}
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
          {children}
        </div>
      </div>
    </>
  );
};

RegisterForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default RegisterForm;
