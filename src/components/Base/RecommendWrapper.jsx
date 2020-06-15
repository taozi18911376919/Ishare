import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Recommend from '@Components/Base/Recommend';

const useStyles = createUseStyles(({
  root: {
    width: '100%',
    padding: 0,
    display: 'grid',
    listStyleType: 'none',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridColumnGap: '5%',
  },
  column: {
    gridTemplateColumns: 'repeat(2, 47%)',
    gridColumnGap: '6%',
  },
  item: {
    margin: [0, 0, 48, 0],
  },
}), {
  name: 'RecommendWrapper',
});

const RecommendWrapper = props => {
  const { data, isShowDesc, column } = props;
  const classes = useStyles();
  return (
    <ul
      className={classNames({ [classes.root]: true, [classes.column]: column })}
    >
      {
        data.map(contribute => (
          <li className={classNames(classes.item)} key={contribute.get('id')}>
            <Recommend isShowDesc={isShowDesc} data={contribute} />
          </li>
        ))
      }
    </ul>
  );
};

RecommendWrapper.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isShowDesc: PropTypes.bool,
  column: PropTypes.bool,
};

RecommendWrapper.defaultProps = {
  isShowDesc: false,
  column: false,
};

export default RecommendWrapper;
