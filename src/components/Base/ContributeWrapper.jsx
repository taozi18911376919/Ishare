import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Contribute from '@Componnents/Base/Contribute';

const useStyles = createUseStyles(({
  root: {
    width: '100%',
    display: 'flex',
    padding: 0,
    listStyleType: 'none',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '30%',
    margin: [0, 0, 48, 0],
  },
}), {
  name: 'Contribute',
});

const ContributeWrapper = props => {
  const { data, isColumn } = props;
  console.log(data);
  const classes = useStyles();
  return (
    <ul
      className={classNames({
        [classes.root]: true,
        [classes.directionColumn]: isColumn,
      })}
    >
      {
        data.map(contribute => {
          console.log(contribute);
          return (
            <li className={classNames(classes.item)} key={contribute.get('id')}>
              <Contribute isColumn data={contribute} />
            </li>
          );
        })
      }
    </ul>
  );
};

ContributeWrapper.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isColumn: PropTypes.bool,
};

ContributeWrapper.defaultProps = {
  isColumn: false,
};

export default ContributeWrapper;
