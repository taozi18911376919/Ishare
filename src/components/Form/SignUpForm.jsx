import React from 'react';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';


import SignAction from '@Actions/sign';

import FloatLabelInput from '@Components/Base/FloatLabelInput';

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
    padding: ['3rem', '2.5rem'],
  },
  field: {
    '& + &': {
      marginTop: 24,
    },
  },
  submit: {
    width: '100%',
    outline: 'none',
    border: '2px solid #1877f2',
    borderRadius: 24,
    height: 48,
    backgroundColor: '#1877f2',
    fontSize: 16,
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all .3s',
    position: 'relative',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#1877f2',
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
  },
}), {
  name: 'SignUpForm',
});

const SignUpForm = () => {
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
      name: '',
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
      return error;
    },
    onSubmit: (formData, formikBag) => {
      dispatch(SignAction.signup(formData, formikBag));
    },
    displayName: 'SignUpForm',
  });

  const showError = field => {
    if (formikErrors && formikErrors[field] && submitCount) {
      return (
        <p className={classNames(classes.error)}>{formikErrors[field]}</p>
      );
    }
    return null;
  };

  return (
    <form
      className={classNames(classes.root)}
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <div className={classNames(classes.field)}>
        <FloatLabelInput
          name='name'
          value={values.name}
          placeholder='Name'
          onChange={handleChange}
        />
        {showError('name')}
      </div>
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
          <span>Sign Up</span>
          {isSubmitting && (
            <span className={classNames(classes.loading)}>
              <Icon path={mdiLoading} size={1} />
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
