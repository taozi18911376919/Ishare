import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import RecommendWrapper from '@Components/Base/RecommendWrapper';

const RecommendTopics = () => {
  const categorys = useSelector(state => state.getIn(['home', 'data', 'recommend_topic']), shallowEqual);

  return (
    <>
      <RecommendWrapper data={categorys} isShowDesc column />
    </>
  );
};

export default RecommendTopics;
