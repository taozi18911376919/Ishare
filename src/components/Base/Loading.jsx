import React from 'react';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({
  '@global': {
    '@keyframes loading': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
  },
  root: {
    width: '100%',
    padding: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    animation: 'loading 1s linear infinite',
  },
}), {
  name: 'Loading',
});

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.root)}>
      <div className={classNames(classes.loading)}>
        <Icon path={mdiLoading} size={1.5} />
      </div>
    </div>
  );
};

export default Loading;
