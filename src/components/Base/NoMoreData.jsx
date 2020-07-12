import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import css from '@Assets/sass/custom.sass';

const useStyles = createUseStyles(({
  root: {
    display: 'block',
    margin: [24, 'auto'],
  },
}), {
  name: 'ViewMore',
});

const NoMoreData = () => {
  const classes = useStyles();
  return (
    <button type='button' className={classNames(classes.root, css.button, css['is-white'], css['medium'])}>
      No More Data
    </button>
  );
};

export default NoMoreData;
