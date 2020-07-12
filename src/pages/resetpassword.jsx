import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import Router from 'next/router';
import { parseCookies } from 'nookies';

import css from '@Assets/sass/custom.sass';

import { Link } from '@Server/routes';
import ForgotPasswordForm from '@Components/Form/ForgotPasswordForm';


const useStyles = createUseStyles(({
  root: {
    width: '100%',
    maxWidth: 560,
    margin: [48, 'auto'],
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    margin: [0, 0, 34, 0],
  },
  wrapper: {
    overflow: 'hidden',
    padding: [48, 24],
    borderRadius: 6,
    backgroundColor: '#ffffff',
    boxShadow: '0px 6px 30px 0px rgba(0,62,137,0.1)',
  },
  text: {
    marginTop: 16,
    textAlign: 'right',
    '& > a': {
      color: '#1877f2',
      marginLeft: 8,
    },
  },
}), {
  name: 'ResetPassword',
});

const ResetPassword = () => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root)}>
      <h2 className={classNames(css.title, classes.title, css['is-2'])}>Reset Password</h2>
      <div className={classNames(classes.wrapper)}>
        <ForgotPasswordForm>
          <p className={classNames(classes.text)}>
            <Link route='/login'>
              <a>Back to log in</a>
            </Link>
          </p>
        </ForgotPasswordForm>
      </div>
    </div>
  );
};

ResetPassword.getInitialProps = ctx => {
  const { token } = parseCookies(ctx);
  if (token) {
    if (ctx.isServer) {
      ctx.res.writeHead(302, {
        Location: '/',
      });
      ctx.res.end();
    } else {
      Router.replace('/');
    }
  }
};

export default ResetPassword;
