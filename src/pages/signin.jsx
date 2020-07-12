import React from 'react';
import classNames from 'classnames';
import LoginForm from '@Components/Form/LoginForm';
import { createUseStyles } from 'react-jss';
import Router from 'next/router';
import { parseCookies } from 'nookies';

import css from '@Assets/sass/custom.sass';

import { Link } from '@Server/routes';

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
  name: 'SignIn',
});

const SignInPage = () => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root)}>
      <h2 className={classNames(css.title, classes.title, css['is-2'])}>Login</h2>
      <div className={classNames(classes.wrapper)}>
        <LoginForm>
          <div className={classNames(classes.text)}>
            <p>
              <span>Not registered yet?</span>
              <Link route='/signup'>
                <a>Sign Up</a>
              </Link>
            </p>
            <p>
              <Link route='/resetpassword'>
                <a>Forgot Password?</a>
              </Link>
            </p>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

SignInPage.getInitialProps = ctx => {
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

export default SignInPage;
