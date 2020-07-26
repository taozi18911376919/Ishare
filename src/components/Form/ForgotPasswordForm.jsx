import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import css from '@Assets/sass/custom.sass';


import SignAction from '@Actions/sign';
import Network from '@Utils/network';
import Config from '@Config';

import FloatLabelInput from '@Components/Base/FloatLabelInput';
import { useDispatch } from 'react-redux';

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
  control: {
    display: 'flex',
    '& > div': {
      flex: 1,
      marginRight: 20,
    },
  },
  send: {
    minWidth: 146,
  },
}), {
  name: 'ForgotPasswordForm',
});

const ForgotPasswordForm = ({ children }) => {
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
      setBtnContent(`Resend ${time}s`);
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
    touched,
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
    if (touched[field] && formikErrors[field]) {
      return (
        <p className={classNames(css.help, css['is-danger'])}>{formikErrors[field]}</p>
      );
    }
    return null;
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
    <>
      <h3 className={classNames(classes.title)}>Topixin</h3>
      <p className={classNames(classes.subTitle)}>A place to shark konwledge and better understand the world</p>
      <div className={classNames(css.columns)}>
        <div className={classNames(css.column, css['is-10'], css['is-offset-1'])}>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <div className={classNames(css.field, classes.field)}>
              <div className={classNames(css.control)}>
                <FloatLabelInput
                  className={classNames(classes.input)}
                  name='email'
                  value={values.email}
                  placeholder='Email'
                  onChange={handleChange}
                />
              </div>
              {showError('email')}
            </div>
            <div className={classNames(css.field, classes.field)}>
              <div className={classNames(css.control, classes.control)}>
                <FloatLabelInput
                  name='verification_code'
                  placeholder='Code'
                  value={values.verification_code}
                  onChange={handleChange}
                  style={{ flex: 1 }}
                />
                <button
                  type='button'
                  className={classNames(css.button, css['is-medium'], css['is-link'], classes.send)}
                  disabled={disabled}
                  onClick={handleSendEmail}
                >
                  {btnContent}
                </button>
              </div>
              {showError('verification_code')}
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
                  Submit
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


ForgotPasswordForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default ForgotPasswordForm;
