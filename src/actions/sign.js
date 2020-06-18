import Config from '@Config';
import NetWork from '@Utils/network';
import Router from 'next/router';
import { setCookie } from 'nookies';

const signup = (params, formikBag) => () => {
  const {
    setSubmitting,
    setFieldError,
  } = formikBag;
  return NetWork.post(`${Config.apiBaseUrl}/api/v1/user/register`, {
    ...params,
  })
    .then(data => {
      setSubmitting(false);
      setCookie(null, 'token', data.getIn(['user', 'api_token']), {
        path: '/',
        maxAge: 100 * 365 * 24 * 60 * 60,
      });
      Router.push('/account');
    })
    .catch(error => {
      const err = JSON.parse(error.message);
      Object.keys(err).map(item => setFieldError(item, err[item]));
      setSubmitting(false);
    });
};

const signin = (params, formikBag) => () => {
  const {
    setSubmitting,
    setFieldError,
  } = formikBag;
  return NetWork.post(`${Config.apiBaseUrl}/api/v1/user/login`, {
    ...params,
  })
    .then(data => {
      setSubmitting(false);
      setCookie(null, 'token', data.getIn(['user', 'api_token']), {
        path: '/',
        maxAge: 100 * 365 * 24 * 60 * 60,
      });
      Router.push('/account');
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

const facebookSign = params => () => NetWork.post(`${Config.apiBaseUrl}/api/v1/user/login`, {
  ...params,
})
  .then(data => {
    setCookie(null, 'token', data.getIn(['user', 'api_token']), {
      path: '/',
      maxAge: 100 * 365 * 24 * 60 * 60,
    });
    Router.push('/account');
  });

const logout = () => () => {
  NetWork.post(`${Config.apiBaseUrl}/api/v1/user/logout`).then(() => {
    setCookie(null, 'token', '', {
      path: '/',
      maxAge: -1,
    });
    Router.push('/signin');
  });
};


export default {
  signup,
  signin,
  logout,
  facebookSign,
};
