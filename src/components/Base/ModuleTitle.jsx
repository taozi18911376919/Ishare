import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(({
  root: {
    fontSize: 24,
    color: '#2c2c2c',
    lineHeight: 1.25,
    margin: [0, 0, 24, 0],
    '& small': {
      lineHeight: 1,
      padding: [2, 8],
      backgroundColor: 'rgba(0, 0, 0, .025)',
      marginLeft: '1em',
      color: '#929292',
      fontWeight: 'normal',
    },
  },
  color: {
    color: '#f5222d',
  },
}), {
  name: 'ModuleTitle',
});

const ModuleTitle = props => {
  const { children, color } = props;
  const classes = useStyles();
  return (
    <h2
      className={classNames({
        [classes.root]: true,
        [classes.color]: color,
      })}
    >
      {children}
    </h2>
  );
};

ModuleTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  color: PropTypes.bool,
};

ModuleTitle.defaultProps = {
  color: false,
};

export default ModuleTitle;
