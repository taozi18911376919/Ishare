import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

import css from '@Assets/sass/custom.sass';

const useStyles = createUseStyles(({
  root: {
    display: 'block',
    margin: [24, 'auto'],
  },
}), {
  name: 'ViewMore',
});

const ViewMore = ({ onClick }) => {
  const classes = useStyles();
  return (
    <button
      type='button'
      className={classNames(classes.root, css.button, css['is-link'], css['is-medium'])}
      onClick={() => onClick()}
    >
      View more
    </button>
  );
};

ViewMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ViewMore;
