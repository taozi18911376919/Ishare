import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';

import ModuleTilt from '@Components/Base/ModuleTitle';
import RecommendWrapper from '@Components/Base/RecommendWrapper';

const RecommendTopics = props => {
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
      <ModuleTilt>
        Topics you may like
        {categoryName && <small>#{categoryName}</small>}
      </ModuleTilt>
      <RecommendWrapper data={data} />
    </>
  );
};

RecommendTopics.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  categoryId: PropTypes.number.isRequired,
};

export default RecommendTopics;
