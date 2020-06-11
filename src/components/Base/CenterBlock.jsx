import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';

const minWidth = 1280;

const useStyles = createUseStyles(({
  root: {
    width: 980,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  [`@media (min-width: ${minWidth}px)`]: {
    root: {
      width: 1200,
    },
  },
}), {
  name: 'CenterBlock',
});

const CenterBlock = ({ children, className }) => {
  const classes = useStyles();

  return (
    <section className={classNames(classes.root, className)}>
      {children}
    </section>
  );
};

CenterBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  className: PropTypes.string,
};

CenterBlock.defaultProps = {
  className: undefined,
};


export default CenterBlock;
