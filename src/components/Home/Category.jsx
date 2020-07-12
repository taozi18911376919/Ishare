import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import css from '@Assets/sass/custom.sass';

import HomeAction from '@Actions/home';

const Category = props => {
  const { data, categoryId, onChange } = props;
  const dispatch = useDispatch();
  const homeLoading = useSelector(state => state.getIn(['home', 'loading']), shallowEqual);


  const handelChangeCategory = id => {
    onChange(id);
    if (!homeLoading) {
      dispatch(HomeAction.fetchHomeData(id));
    }
  };

  return (
    <ul className={classNames(css.buttons)} style={{ paddingTop: '32px' }}>
      <li
        className={classNames({
          [css.button]: true,
          [css['is-small']]: true,
          [css['is-light']]: !categoryId,
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
              [css.button]: true,
              [css['is-small']]: true,
              [css['is-light']]: categoryId === id,
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
