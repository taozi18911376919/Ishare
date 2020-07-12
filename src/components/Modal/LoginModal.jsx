import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import UiAction from '@Actions/ui';

import LoginForm from '../Form/LoginForm';

const useStyles = createUseStyles(({
  root: {
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
  name: 'LoginModal',
});

const LoginModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleShowModal = type => dispatch(UiAction.showModal(type));
  return (
    <LoginForm>
      <div className={classNames(classes.root)}>
        <p>
          <span>Not registered yet?</span>
          <a onClick={() => handleShowModal('register')}>Sign Up</a>
        </p>
        <p><a onClick={() => handleShowModal('forgotPassword')}>Forgot Password?</a></p>
      </div>
    </LoginForm>
  );
};

export default LoginModal;
