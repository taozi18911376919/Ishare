import React from 'react';
import classNames from 'classnames';
import SignUpForm from '@Components/Form/SignUpForm';
import { createUseStyles } from 'react-jss';

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
  name: 'SignUp',
});

export default () => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.root)}>
      <h2 className={classes.title}>Sign Up</h2>
      <div className={classes.wrapper}>
        <SignUpForm />
      </div>
    </div>
  );
};
