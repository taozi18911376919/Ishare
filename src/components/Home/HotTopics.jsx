import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({
  title: {
    fontSize: 18,
    color: '#f5222d',
    '& small': {
      lineHeight: 1,
      padding: [2, 8],
      backgroundColor: 'rgba(0, 0, 0, .025)',
      marginLeft: '1em',
      color: '#929292',
      fontWeight: 'normal',
    },
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: [24, 0],
  },
  item: {
    width: 376,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'red',
  },
  center: {
    width: 314,
    height: 418,
  },
}), {
  name: 'Home-HotTopics',
});

const HotTopics = props => {
  const { data, categoryId } = props;
  console.log(data);
  const classes = useStyles();
  const [categoryName, setCategoryName] = useState(undefined);
  const categorys = useSelector(state => state.getIn(['home', 'data', 'category']), shallowEqual);

  useEffect(() => {
    if (categoryId) {
      categorys.forEach(item => {
        if (item.get('id') === categoryId) {
          setCategoryName(item.get('name'));
        }
      });
    } else {
      setCategoryName(undefined);
    }
  }, [categoryId]);

  return (
    <>
      <h2 className={classNames(classes.title)}>
        Hot Topics
        {categoryName && <small>{categoryName}</small>}
      </h2>
      <div className={classNames(classes.root)}>
        <div className={classNames(classes.item)}>1</div>
        <div className={classNames(classes.item, classes.center)}>2</div>
        <div className={classNames(classes.item)}>3</div>
      </div>
    </>
  );
};

HotTopics.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  categoryId: PropTypes.number.isRequired,
};

export default HotTopics;
