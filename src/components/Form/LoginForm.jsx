import React, { useState } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import css from '@Assets/sass/custom.sass';

import SignAction from '@Actions/sign';

import FloatLabelInput from '@Components/Base/FloatLabelInput';
import TwitterIcon from '@Components/Icon/TwitterIcon';
import FacebookLogin from '@Components/Base/FacebookLogin';


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
  icon: {
    '&:first-child:not(:last-child)': {
      marginRight: '12px !important',
    },
  },
  text: {
    paddingTop: 12,
    '& > p': {
      lineHeight: 1,
      margin: [8, 0, 0, 0],
      color: '#929292',
    },
    '& a': {
      color: '#1877f2',
      '&:not(:first-child)': {
        marginLeft: 12,
      },
    },
  },
}), {
  name: 'LoginForm',
});

const LoginForm = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [twitterLoading, setTwitterLoading] = useState(false);

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
    if (touched[field] && formikErrors[field]) {
      return (
        <p className={classNames(css.help, css['is-danger'])}>{formikErrors[field]}</p>
      );
    }
    return null;
  };

  return (
    <>
      <h3 className={classNames(classes.title)}>Topixin</h3>
      <p className={classNames(classes.subTitle)}>A place to shark konwledge and better understand the world</p>
      <div className={classNames(css.columns)}>
        <div className={classNames(css.column, css['is-10'], css['is-offset-1'])}>
          <form
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <div className={classNames(css.field, classes.field)}>
              <div className={classNames(css.control)}>
                <FloatLabelInput
                  name='email'
                  value={values.email}
                  placeholder='Email'
                  onChange={handleChange}
                />
              </div>
              {showError('email')}
            </div>
            <div className={classNames(css.field, classes.field)}>
              <div className={classNames(css.control)}>
                <FloatLabelInput
                  name='password'
                  placeholder='Password'
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
                  Log in
                </button>
              </div>
            </div>
          </form>
          {children}
        </div>
      </div>
      <hr />
      <div className={classNames(css.columns)}>
        <div className={classNames(css.column, css['is-8'], css['is-offset-2'])}>
          <div className={classNames(css.field, classes.field)}>
            <div className={classNames(css.control)}>
              <FacebookLogin />
            </div>
          </div>
          <div className={classNames(css.field, classes.field)}>
            <div className={classNames(css.control)}>
              <a
                href='https://api.prod.topixin.com/twitter'
                onClick={() => setTwitterLoading(true)}
                className={classNames({
                  [css.button]: true,
                  [css['is-fullwidth']]: true,
                  [css['is-medium']]: true,
                  [css['is-light']]: true,
                  [css['is-rounded']]: true,
                  [css['is-loading']]: twitterLoading,
                })}
              >
                <span className={classNames(css.icon, classes.icon)}>
                  <TwitterIcon />
                </span>
                <span>Continue With Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LoginForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default LoginForm;
