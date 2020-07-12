import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import UiAction from '@Actions/ui';

import RegisterForm from '../Form/RegisterForm';

const useStyles = createUseStyles(({
  root: {
    marginTop: 16,
    '& > a': {
      color: '#1877f2',
      marginLeft: 8,
    },
  },
}), {
  name: 'RegisterModal',
});

const RegisterModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleShowModal = type => dispatch(UiAction.showModal(type));
  return (
    <RegisterForm>
      <p className={classNames(classes.root)}>
        <span>Already have an account?</span>
        <a onClick={() => handleShowModal('login')}>Log in</a>
      </p>
    </RegisterForm>
  );
};

export default RegisterModal;
