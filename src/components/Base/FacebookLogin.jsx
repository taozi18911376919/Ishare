import React, { useState } from 'react';
import ReactFacebookLogin from 'react-facebook-login';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';

import css from '@Assets/sass/custom.sass';

import Config from '@Config';
import SignAction from '@Actions/sign';

import FacebookIcon from '@Components/Icon/FacebookIcon';

const useStyles = createUseStyles(({
  icon: {
    '&:first-child:not(:last-child)': {
      marginRight: '12px !important',
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
          type='submit'
          className={classNames({
            [css.button]: true,
            [css['is-fullwidth']]: true,
            [css['is-medium']]: true,
            [css['is-link']]: true,
            [css['is-rounded']]: true,
            [css['is-loading']]: isLoading,
          })}
        >
          Continue With Facebook
        </button>
      ) : (
        <ReactFacebookLogin
          appId={Config.facebookAppid}
          callback={responseFacebook}
          onFailure={handleFailure}
          onClick={handleClick}
          cookie={process.env.NODE_ENV === 'production'}
          cssClass={classNames({
            [css.button]: true,
            [css['is-fullwidth']]: true,
            [css['is-medium']]: true,
            [css['is-link']]: true,
            [css['is-rounded']]: true,
            [css['is-loading']]: isLoading,
          })}
          icon={(
            <span className={classNames(css.icon, classes.icon)}>
              <FacebookIcon />
            </span>
          )}
          textButton={<span>Continue With Facebook</span>}
        />
      )}
    </>

  );
};

export default FacebookLogin;
