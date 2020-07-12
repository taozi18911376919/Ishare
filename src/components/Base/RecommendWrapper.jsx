import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import css from '@Assets/sass/custom.sass';

import Recommend from '@Components/Base/Recommend';

const useStyles = createUseStyles(({
  columns: {
    flexWrap: 'wrap',
  },
  column: {
    paddingBottom: 48,
  },
}), {
  name: 'RecommendWrapper',
});

const RecommendWrapper = props => {
  const { data, isShowDesc } = props;
  const classes = useStyles();
  return (
    <ul
      className={classNames({
        [classes.columns]: true,
        [css.columns]: true,
      })}
    >
      {
        data.map(recommend => (
          <li
            className={classNames(css.column, css['is-one-third-desktop'], css['is-half-tablet'], classes.column)}
            key={recommend.get('id')}
          >
            <Recommend isShowDesc={isShowDesc} data={recommend} />
          </li>
        ))
      }
    </ul>
  );
};

RecommendWrapper.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isShowDesc: PropTypes.bool,
};

RecommendWrapper.defaultProps = {
  isShowDesc: false,
};

export default RecommendWrapper;
