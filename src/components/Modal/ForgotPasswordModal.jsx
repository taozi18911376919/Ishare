import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import UiAction from '@Actions/ui';

import ForgotPasswordForm from '../Form/ForgotPasswordForm';

const useStyles = createUseStyles(({
  root: {
    marginTop: 16,
    textAlign: 'right',
    '& > a': {
      color: '#1877f2',
      marginLeft: 8,
    },
  },
}), {
  name: 'ForgotPasswordModal',
});

const ForgotPasswordModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleShowModal = type => dispatch(UiAction.showModal(type));
  return (
    <ForgotPasswordForm>
      <p className={classNames(classes.root)}>
        <a onClick={() => handleShowModal('login')}>Back to log in</a>
      </p>
    </ForgotPasswordForm>
  );
};

export default ForgotPasswordModal;
