import React, { useEffect } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { useDispatch } from 'react-redux';

import css from '@Assets/sass/custom.sass';

import { Link } from '@Server/routes';
import UiAction from '@Actions/ui';
import RegisterForm from '@Components/Form/RegisterForm';


const useStyles = createUseStyles(({
  root: {
    width: '100%',
    maxWidth: 500,
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
  login: {
    marginTop: 16,
    '& > a': {
      color: '#1877f2',
      marginLeft: 8,
    },
  },
}), {
  name: 'SignUp',
});

const SignUpPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UiAction.closeModal());
  }, []);

  return (
    <div className={classNames(classes.root)}>
      <h2 className={classNames(classes.title, css.title, css['is-2'])}>Sign Up</h2>
      <div className={classNames(classes.wrapper)}>
        <RegisterForm>
          <p className={classNames(classes.login)}>
            <span>Already have an account?</span>
            <Link route='/signin'>
              <a>Log in</a>
            </Link>
          </p>
        </RegisterForm>
      </div>
    </div>
  );
};

SignUpPage.getInitialProps = ctx => {
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

export default SignUpPage;
