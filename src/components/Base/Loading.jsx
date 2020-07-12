import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import css from '@Assets/sass/custom.sass';

const useStyles = createUseStyles(({
  root: {
    width: '100%',
    padding: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
}), {
  name: 'Loading',
});

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.root)}>
      <button type='button' className={classNames(css.button, css['is-loading'], css['is-link'], css['is-medium'])}>Loading</button>
    </div>
  );
};

export default Loading;
