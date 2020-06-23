import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 68,
    boxSizing: 'border-box',
  },
}), {
  name: 'Redirect',
});

const Redirect = () => {
  const classes = useStyles();
  useEffect(() => {
    require('hellojs/dist/hello.all');
  }, []);
  return (
    <div className={classes.root}>Please close this window to continue.</div>
  );
};

export default Redirect;
