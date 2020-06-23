import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiTwitter } from '@mdi/js';
import { useRouter } from 'next/router';

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
    color: '#2c2c2c',
    cursor: 'pointer',
    transition: 'all .3s',
    position: 'relative',
    margin: [16, 'auto'],
    '&:hover': {
      backgroundColor: '#2c2c2c',
      color: '#E4E4E4',
    },
  },
  label: {
    height: '100%',
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
  const router = useRouter();

  const handleSetRedirect = () => {
    if (router.pathname !== '/signin') {
      global.window.localStorage.setItem('redirect', encodeURIComponent(router.asPath));
    }
  };

  return (
    <a className={classNames(classes.submit)} href='https://api.prod.topixin.com/twitter' onClick={handleSetRedirect}>
      <span className={classNames(classes.label)}>
        <span className={classNames(classes.iconWrapper)}><Icon path={mdiTwitter} size={1} /></span>
        Continue With Twitter
      </span>
    </a>
  );
};

export default TwitterLogin;
