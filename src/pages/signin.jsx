import React from 'react';
import classNames from 'classnames';
import SignInForm from '@Components/Form/SignInForm';
import { createUseStyles } from 'react-jss';

import FacebookLogin from '@Components/Base/FacebookLogin';

//
const useStyles = createUseStyles(({
  root: {
    width: 500,
    margin: [48, 'auto'],
  },
  title: {
    textAlign: 'center',
    margin: [0, 0, 34, 0],
  },
  wrapper: {
    boxShadow: '0px 6px 30px 0px rgba(0,62,137,0.1)',
  },
}), {
  name: 'SignIn',
});

export default () => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root)}>
      <h2 className={classes.title}>Login</h2>
      <div className={classes.wrapper}>
        <SignInForm />
        <FacebookLogin />
      </div>
    </div>
  );
};
