import React from 'react';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import SignAction from '@Actions/sign';
import UiAction from '@Actions/ui';
import FloatLabelInput from '@Components/Base/FloatLabelInput';
import FacebookLogin from '@Components/Base/FacebookLogin';
import TwitterLogin from '@Components/Base/TwitterLogin';

const useStyles = createUseStyles(({
  '@global': {
    '@keyframes loading': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
  },
  root: {
    margin: [0, 'auto'],
    padding: ['1rem', '2.5rem'],
  },
  field: {
    '& + &': {
      marginTop: 16,
    },
  },
  submit: {
    width: '100%',
    outline: 'none',
    border: '2px solid #F5222D',
    borderRadius: 24,
    height: 48,
    backgroundColor: '#F5222D',
    fontSize: 16,
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all .3s',
    position: 'relative',
    marginTop: 4,
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#F5222D',
    },
    '&:disabled': {
      pointerEvents: 'none',
      '& span:nth-child(1)': {
        opacity: 0,
      },
    },
  },
  loading: {
    position: 'absolute',
    left: -2,
    top: -2,
    right: -2,
    bottom: -2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    '& svg': {
      animation: 'loading 1s linear infinite',
    },
  },
  error: {
    fontSize: 14,
    lineHeight: 1.25,
    color: '#f5222d',
    marginBottom: 0,
  },
  forgetPassword: {
    display: 'block',
    margin: [0, 'auto'],
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: [8, 16],
    textDecoration: 'underline',
    color: '#f5222d',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#cfcfcf',
    margin: [16, 'auto', 24],
  },
  text: {
    padding: [0, 24],
    '& a': {
      padding: [0, 4],
      textDecoration: 'underline',
      color: '#1877f2',
    },
  },
}), {
  name: 'SignInForm',
});

const SignInForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    values,
    handleSubmit,
    handleChange,
    isSubmitting,
    errors: formikErrors,
    submitCount,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: formData => {
      const error = {};
      if (!formData.email) {
        error.email = 'The email field is required.';
      }
      if (!formData.password) {
        error.password = 'The password field is required.';
      }
      return error;
    },
    onSubmit: (formData, formikBag) => {
      dispatch(SignAction.signin(formData, formikBag));
    },
    displayName: 'SignInForm',
  });

  const showError = field => {
    if (formikErrors && formikErrors[field] && submitCount) {
      return (
        <p className={classNames(classes.error)}>{formikErrors[field]}</p>
      );
    }
    return null;
  };

  const handleShowForgetPasswordModal = () => {
    dispatch(UiAction.showModal('forgetPassword'));
  };

  return (
    <>
      <form
        className={classNames(classes.root)}
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <div className={classNames(classes.field)}>
          <FloatLabelInput
            name='email'
            value={values.email}
            placeholder='Email'
            onChange={handleChange}
          />
          {showError('email')}
        </div>
        <div className={classNames(classes.field)}>
          <FloatLabelInput
            name='password'
            placeholder='Password'
            type='password'
            value={values.password}
            onChange={handleChange}
          />
          {showError('password')}
        </div>
        <div className={classNames(classes.field)}>
          <button type='submit' disabled={isSubmitting} className={classNames(classes.submit)}>
            <span>Log In</span>
            {isSubmitting && (
              <span className={classNames(classes.loading)}>
                <Icon path={mdiLoading} size={1} />
              </span>
            )}
          </button>
        </div>
      </form>
      <button type='button' className={classNames(classes.forgetPassword)} onClick={handleShowForgetPasswordModal}>
        Forget Password?
      </button>
      <div className={classNames(classes.line)} />
      <FacebookLogin />
      <TwitterLogin />
      <p className={classNames(classes.text)}>
        <a>Sign Up With Email</a>, by Signing up you indicate that you have read and agree to Terms of service and Privacy policy.
      </p>
      <p className={classNames(classes.text)}>
        <a>Terms of service</a>And<a>Privacy policy</a>
      </p>
    </>
  );
};

export default SignInForm;
