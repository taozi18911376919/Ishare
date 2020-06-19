import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiLoading, mdiTwitter } from '@mdi/js';
import { useDispatch } from 'react-redux';

// import Config from '@Config';

import SignAction from '@Actions/sign';

const useStyles = createUseStyles(({
  submit: {
    display: 'block',
    width: 420,
    outline: 'none',
    border: '2px solid #E4E4E4',
    borderRadius: 24,
    height: 48,
    backgroundColor: '#E4E4E4',
    fontSize: 18,
    color: '#2c2cc2c',
    cursor: 'pointer',
    transition: 'all .3s',
    position: 'relative',
    margin: [16, 'auto'],
    '&:hover': {
      backgroundColor: '#2c2c2c',
      color: '#E4E4E4',
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
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 30,
    height: 30,
    backgroundColor: '#1877f2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    marginRight: 8,
    color: '#ffffff',
  },
}), {
  name: 'TwitterLogin',
});


const TwitterLogin = () => {
  const classes = useStyles();
  const [isLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    const newWindow = global.window.open(
      'http://localhost:3006/signin?token=1270170793343778817-kQETD7SdTjBTfeWJEK87II6HWGPxrW',
      '',
      'height=500, width=800, top=100, left=100, toolbar=no, menubar=no, scrollbars=no,resizable=no, location=no, status=no',
    );

    newWindow.addEventListener('message', ({ origin, data }) => {
      if (origin === 'http://localhost:3006' && 'token' in data) {
        dispatch(SignAction.twitterSign({
          token: data.token,
        }));
        newWindow.close();
      }
    });
  };

  return (
    <button type='button' disabled={isLoading} className={classNames(classes.submit)} onClick={handleClick}>
      <span className={classNames(classes.label)}>
        <span className={classNames(classes.iconWrapper)}><Icon path={mdiTwitter} size={1} /></span>
        Continue With Twitter
      </span>
      {isLoading && (
        <span className={classNames(classes.loading)}>
          <Icon path={mdiLoading} size={1} />
        </span>
      )}
    </button>
  );
};

export default TwitterLogin;
