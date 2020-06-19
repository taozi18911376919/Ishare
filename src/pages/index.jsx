import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import CenterBlock from '@Components/Base/CenterBlock';
import HomeCategory from '@Components/Home/Category';
import HomeHotTopics from '@Components/Home/HotTopics';
import HomeContributes from '@Components/Home/Contributes';
import HomeRecommendTopics from '@Components/Home/RecommendTopics';

import HomeAction from '@Actions/home';

const HomePage = () => {
  const [categoryId, setCategoryId] = useState(0);

  const { homeData } = useSelector(state => ({
    homeData: state.getIn(['home', 'data']),
    homeLoading: state.getIn(['home', 'loading']),
  }), shallowEqual);

  const category = homeData.get('category');
  const hotTopic = homeData.get('hot_topic');
  const latestContribute = homeData.get('latest_contribute');
  const recommendTopic = homeData.get('recommend_topic');

  return (
    <CenterBlock>
      <>
        <HomeCategory
          data={category}
          categoryId={categoryId}
          onChange={setCategoryId}
        />
        {!!hotTopic.size && <HomeHotTopics data={hotTopic} categoryId={categoryId} />}
        {!!latestContribute.size && <HomeContributes data={latestContribute} categoryId={categoryId} />}
        {!!recommendTopic.size && <HomeRecommendTopics data={recommendTopic} categoryId={categoryId} />}
      </>
    </CenterBlock>
  );
};

HomePage.getInitialProps = async ({ store }) => {
  await store.dispatch(HomeAction.fetchHomeData());
  return store;
};

export default HomePage;
