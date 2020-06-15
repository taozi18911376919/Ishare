import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({
  root: {
    width: '100%',
    padding: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}), {
  name: 'NoMoreData',
});

const NoMoreData = () => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.root)}>
      No More Data
    </div>
  );
};


export default NoMoreData;
