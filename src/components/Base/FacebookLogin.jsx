import React, { useState } from 'react';
import ReactFacebookLogin from 'react-facebook-login';
import { createUseStyles } from 'react-jss';
import { mdiFacebook, mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';


import Config from '@Config';
import SignAction from '@Actions/sign';
import { useDispatch } from 'react-redux';

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
    backgroundColor: '#1877f2',
    width: 420,
    height: 48,
    borderRadius: 24,
    outline: 'none',
    fontSize: 18,
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: [0, 'auto'],
    cursor: 'pointer',
    border: '2px solid #1877f2',
    transition: 'all .3s',
    position: 'relative',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#1877f2',
    },
    '&:disabled': {
      pointerEvents: 'none',
    },
    '& svg': {
      marginRight: 10,
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
}), {
  name: 'FacebookLogin',
});

const FacebookLogin = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const responseFacebook = response => {
    const { accessToken, userID } = response;
    dispatch(SignAction.facebookSign({
      access_token: accessToken,
      facebook_user_id: userID,
    }));
  };

  const handleFailure = () => {
    setIsLoading(false);
  };

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <>
      {isLoading ? (
        <button
          type='button'
          className={classNames(classes.root)}
          disabled={isLoading}
        >
          <span className={classNames(classes.loading)}>
            <Icon path={mdiLoading} size={1} />
          </span>
        </button>
      ) : (
        <ReactFacebookLogin
          appId={Config.facebookAppid}
          callback={responseFacebook}
          onFailure={handleFailure}
          onClick={handleClick}
          cookie={process.env.NODE_ENV === 'production'}
          cssClass={classes.root}
          icon={<Icon path={mdiFacebook} size={1.25} />}
          textButton='Continue With Facebook'
        />
      )}
    </>

  );
};

export default FacebookLogin;
