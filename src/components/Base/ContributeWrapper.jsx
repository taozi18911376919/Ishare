import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import css from '@Assets/sass/custom.sass';

import Contribute from '@Components/Base/Contribute';

const useStyles = createUseStyles(({
  columns: {
    flexWrap: 'wrap',
  },
  column: {
    paddingBottom: 48,
  },
}), {
  name: 'ContributeWrapper',
});

const ContributeWrapper = props => {
  const {
    data,
    isColumn,
    fullWidth,
    half,
  } = props;
  const classes = useStyles();
  return (
    <ul
      className={classNames({
        [classes.columns]: true,
        [css.columns]: true,
      })}
    >
      {
        data.map(contribute => (
          <li
            className={classNames({
              [css.column]: true,
              [css['is-12']]: fullWidth,
              [classes.column]: true,
              [css['is-half-desktop']]: half,
              [css['is-one-third-desktop']]: (!half && !fullWidth),
              [css['is-half-tablet']]: (!half && !fullWidth),
            })}
            key={contribute.get('id')}
          >
            <Contribute isColumn={isColumn} data={contribute} />
          </li>
        ))
      }
    </ul>
  );
};

ContributeWrapper.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isColumn: PropTypes.bool,
  fullWidth: PropTypes.bool,
  half: PropTypes.bool,
};

ContributeWrapper.defaultProps = {
  isColumn: true,
  fullWidth: false,
  half: false,
};

export default ContributeWrapper;
