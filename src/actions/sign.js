import Config from '@Config';
import NetWork from '@Utils/network';
import Router from 'next/router';
import { setCookie } from 'nookies';
import AccountAction from './account';
import UiAction from './ui';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const signup = (params, formikBag) => dispatch => {
  const {
    setSubmitting,
    setFieldError,
  } = formikBag;
  return NetWork.post(`${Config.apiBaseUrl}/api/v1/user/register`, {
    ...params,
  })
    .then(data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      setCookie(null, 'token', data.getIn(['user', 'api_token']), {
        path: '/',
        maxAge: 100 * 365 * 24 * 60 * 60,
      });
      dispatch(UiAction.closeModal());
      Router.push('/account');
    })
    .catch(error => {
      const err = JSON.parse(error.message);
      Object.keys(err).map(item => setFieldError(item, err[item]));
      setSubmitting(false);
    });
};

const signin = (params, formikBag) => dispatch => {
  const {
    setSubmitting,
    setFieldError,
  } = formikBag;
  return NetWork.post(`${Config.apiBaseUrl}/api/v1/user/login`, {
    ...params,
  })
    .then(data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      setCookie(null, 'token', data.getIn(['user', 'api_token']), {
        path: '/',
        maxAge: 100 * 365 * 24 * 60 * 60,
      });
      if (global.window.location.href.indexOf('/signin') !== -1) {
        Router.push('/account');
      } else {
        dispatch(UiAction.closeModal());
      }
    })
    .catch(error => {
      try {
        const err = JSON.parse(error.message);
        Object.keys(err).map(item => setFieldError(item, err[item]));
      } catch {
        setFieldError('password', error.message);
      }
      setSubmitting(false);
    });
};

const forgetPassword = (params, formikBag) => dispatch => {
  const {
    setSubmitting,
    setFieldError,
  } = formikBag;
  return NetWork.post(`${Config.apiBaseUrl}/api/v1/user/reset-password`, {
    ...params,
  })
    .then(data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      setCookie(null, 'token', data.getIn(['user', 'api_token']), {
        path: '/',
        maxAge: 100 * 365 * 24 * 60 * 60,
      });
      if (global.window.location.href.indexOf('/signin') !== -1) {
        Router.push('/account');
      } else {
        dispatch(UiAction.closeModal());
      }
    })
    .catch(error => {
      try {
        const err = JSON.parse(error.message);
        Object.keys(err).map(item => setFieldError(item, err[item]));
      } catch {
        setFieldError('password', error.message);
      }
      setSubmitting(false);
    });
};

const facebookSign = params => dispatch => NetWork.post(`${Config.apiBaseUrl}/api/v1/user/facebook-signup`, {
  ...params,
})
  .then(data => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    setCookie(null, 'token', data.getIn(['user', 'api_token']), {
      path: '/',
      maxAge: 100 * 365 * 24 * 60 * 60,
    });
    if (global.window.location.href.indexOf('/signin') !== -1) {
      Router.push('/account');
    } else {
      dispatch(UiAction.closeModal());
    }
  });

const twitterSign = params => dispatch => NetWork.post(`${Config.apiBaseUrl}/api/v1/user/twitter-signup`, {
  ...params,
})
  .then(data => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    setCookie(null, 'token', data.getIn(['user', 'api_token']), {
      path: '/',
      maxAge: 100 * 365 * 24 * 60 * 60,
    });
    const redirect = global.window.localStorage.getItem('redirect');
    if (redirect) {
      Router.push(`${decodeURIComponent(redirect)}`);
      global.window.localStorage.removeItem('redirect');
    } else {
      Router.push('/account');
    }
  });

const logout = () => dispatch => {
  NetWork.post(`${Config.apiBaseUrl}/api/v1/user/logout`).then(() => {
    dispatch(AccountAction.clearUserData());
    setCookie(null, 'token', '', {
      path: '/',
      maxAge: -1,
    });
    if (global.window.location.href.indexOf('account') !== -1) {
      Router.push('/signin');
    } else {
      global.window.location.reload();
    }
  });
};


export default {
  signup,
  signin,
  logout,
  facebookSign,
  forgetPassword,
  twitterSign,
  LOGIN_SUCCESS,
};
