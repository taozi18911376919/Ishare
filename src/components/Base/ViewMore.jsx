import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(({
  root: {
    outline: 'none',
    border: 'none',
    padding: ['0.5em', '2em'],
    borderRadius: 4,
    backgroundColor: '#1877f2',
    display: 'block',
    margin: [24, 'auto'],
    cursor: 'pointer',
    color: '#ffffff',
  },
}), {
  name: 'ViewMore',
});

const ViewMore = ({ onClick }) => {
  const classes = useStyles();
  return (
    <button
      type='button'
      className={classNames(classes.root)}
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
