import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import HomeAction from '@Actions/home';

const useStyles = createUseStyles(({
  root: {
    padding: 0,
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    margin: [32, 0],
    justifyContent: 'center',
  },
  action: {
    color: '#2c2c2c',
    backgroundColor: '#f3f3f3',
  },
  item: {
    fontSize: 16,
    padding: [4, 12],
    backgroundColor: 'rgba(0, 0, 0, .015)',
    borderRadius: 6,
    cursor: 'pointer',
    color: '#929292',
    transition: 'all .3s linear',
    '& + &': {
      marginLeft: 12,
    },
    '&:hover': {
      extend: 'action',
    },
  },
  active: {
    extend: 'action',
  },
}), {
  name: 'Home-Category',
});

const Category = props => {
  const { data, categoryId, onChange } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const homeLoading = useSelector(state => state.getIn(['home', 'loading']), shallowEqual);


  const handelChangeCategory = id => {
    onChange(id);
    if (!homeLoading) {
      dispatch(HomeAction.fetchHomeData(id));
    }
  };

  return (
    <ul className={classNames(classes.root)}>
      <li
        className={classNames({
          [classes.item]: true,
          [classes.active]: !categoryId,
        })}
        onClick={() => handelChangeCategory(0)}
      >
        All
      </li>
      {data.map(category => {
        const name = category.get('name');
        const id = category.get('id');
        return (
          <li
            key={name}
            className={classNames({
              [classes.item]: true,
              [classes.active]: categoryId === id,
            })}
            onClick={() => handelChangeCategory(id)}
          >
            #{name}
          </li>
        );
      })}
    </ul>
  );
};

Category.propTypes = {
  categoryId: PropTypes.number.isRequired,
  onChange: () => {},
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Category;
