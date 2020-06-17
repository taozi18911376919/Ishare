import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Contribute from '@Components/Base/Contribute';

const useStyles = createUseStyles(({
  root: {
    width: '100%',
    display: 'grid',
    padding: 0,
    listStyleType: 'none',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridColumnGap: '5%',
  },
  item: {
    margin: [0, 0, 48, 0],
  },
  column: {
    gridTemplateColumns: '100%',
    gridColumnGap: 0,
  },

}), {
  name: 'ContributeWrapper',
});

const ContributeWrapper = props => {
  const { data, isColumn } = props;
  const classes = useStyles();
  return (
    <ul
      className={classNames({
        [classes.root]: true,
        [classes.column]: !isColumn,
      })}
    >
      {
        data.map(contribute => (
          <li className={classNames(classes.item)} key={contribute.get('id')}>
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
};

ContributeWrapper.defaultProps = {
  isColumn: true,
};

export default ContributeWrapper;
