import React from 'react';
import PropTypes from 'prop-types';

import ModuleTilt from '@Components/Base/ModuleTitle';
import RecommendWrapper from '@Components/Base/RecommendWrapper';
import TopicIcon from '@Components/Icon/Topic';

const RecommendTopics = props => {
  const { data } = props;

  return (
    <>
      <ModuleTilt>
        <span style={{ color: '#FFD666', marginRight: 8 }}><TopicIcon /></span>
        Topics you may like
      </ModuleTilt>
      <RecommendWrapper data={data} />
    </>
  );
};

RecommendTopics.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default RecommendTopics;
