import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(({
  root: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 24,
    color: '#2c2c2c',
    lineHeight: 1.25,
    margin: [48, 0],
  },
  color: {
    color: '#f5222d',
  },
  '@media screen and (max-width: 480px)': {
    root: {
      '& span:last-child': {
        display: 'none',
      },
    },
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
