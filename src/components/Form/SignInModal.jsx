import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

import UiAction from '@Actions/ui';

import SignInForm from './SignInForm';


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
    padding: [24, 48],
    overflowY: 'auto',
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
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: [0, 0, 16, 0],
  },
  subTitle: {
    textAlign: 'center',
  },
}), {
  name: 'SignInModal',
});

const SignInModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(UiAction.closeModal());
  };

  return (
    <div className={classNames(classes.root)}>
      <div className={classNames(classes.content)}>
        <button type='button' className={classNames(classes.close)}>
          <Icon path={mdiClose} size={1} onClick={handleClose} />
        </button>
        <h2 className={classNames(classes.title)}>ishare</h2>
        <p className={classNames(classes.subTitle)}>A place to shark konwledge and better understand the world</p>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInModal;
