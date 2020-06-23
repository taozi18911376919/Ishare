import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiLoading, mdiClose } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import SignAction from '@Actions/sign';
import UiAction from '@Actions/ui';
import FloatLabelInput from '@Components/Base/FloatLabelInput';
import Network from '@Utils/network';
import Config from '@Config';

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
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  content: {
    position: 'relative',
    width: 500,
    maxHeight: '70%',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    boxShadow: '0 0 32px 0 rgba(0, 0, 0, 0.5)',
    padding: [48, 24],
    overflowY: 'auto',
  },
  form: {
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
  close: {
    position: 'absolute',
    right: 12,
    top: 12,
    outline: 'none',
    padding: 8,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  flex: {
    display: 'flex',
    '& div:nth-child(1)': {
      flex: 1,
      marginRight: 16,
    },
  },
  countDown: {
    padding: [8, 16],
    minWidth: 160,
    fontSize: 18,
    border: 'none',
    outline: 'none',
    borderRadius: 30,
    cursor: 'pointer',
    backgroundColor: '#1877f2',
    color: '#ffffff',
    '&:disabled': {
      color: '#929292',
      backgroundColor: '#E4E4E4',
      cursor: 'not-allowed',
    },
  },
}), {
  name: 'ForgetPassword',
});

const ForgetPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const timeId = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [time, setTime] = useState(60);
  const [btnContent, setBtnContent] = useState('Send');

  useEffect(() => {
    clearInterval(timeId.current);
  }, []);

  useEffect(() => {
    if (time > 0 && time < 60) {
      setBtnContent(`${time}s`);
    } else {
      clearInterval(timeId.current);
      setDisabled(false);
      setTime(60);
      setBtnContent('Send');
    }
  }, [time]);

  const {
    values,
    handleSubmit,
    handleChange,
    isSubmitting,
    errors: formikErrors,
    setFieldError,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      verification_code: '',
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
      dispatch(SignAction.forgetPassword(formData, formikBag));
    },
    displayName: 'ForgetPassword',
  });

  const showError = field => {
    if (formikErrors && formikErrors[field]) {
      return (
        <p className={classNames(classes.error)}>{formikErrors[field]}</p>
      );
    }
    return null;
  };

  const handleClose = () => {
    dispatch(UiAction.closeModal());
  };


  const handleSendEmail = () => {
    setDisabled(true);
    Network.post(`${Config.apiBaseUrl}/api/v1/user/send-code`, {
      email: values.email,
    }).then(() => {
      timeId.current = setInterval(() => setTime(t => t - 1), 1000);
      setDisabled(true);
    }).catch(error => {
      const err = JSON.parse(error.message);
      setDisabled(false);
      Object.keys(err).map(item => setFieldError(item, err[item][0]));
    });
  };


  return (
    <div className={classNames(classes.root)}>
      <div className={classNames(classes.content)}>
        <button type='button' className={classNames(classes.close)}>
          <Icon path={mdiClose} size={1} onClick={handleClose} />
        </button>
        <form
          className={classNames(classes.form)}
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
            <div className={classNames(classes.flex)}>
              <FloatLabelInput
                name='verification_code'
                placeholder='Code'
                value={values.verification_code}
                onChange={handleChange}
                style={{ flex: 1 }}
              />
              <button
                type='button'
                className={classNames(classes.countDown)}
                disabled={disabled}
                onClick={handleSendEmail}
              >
                {btnContent}
              </button>
            </div>
            {showError('verification_code')}
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
              <span>Reset Password</span>
              {isSubmitting && (
                <span className={classNames(classes.loading)}>
                  <Icon path={mdiLoading} size={1} />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
