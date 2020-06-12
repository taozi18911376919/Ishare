import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';

import ModuleTilt from '@Componnents/Base/ModuleTitle';
import TopicWrapper from '@Componnents/Base/TopicWrapper';

const HotTopics = props => {
  const { data, categoryId } = props;
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
      <ModuleTilt color>
        Hot Topics
        {categoryName && <small>{categoryName}</small>}
      </ModuleTilt>
      <TopicWrapper data={data} />
    </>
  );
};

HotTopics.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  categoryId: PropTypes.number.isRequired,
};

export default HotTopics;
