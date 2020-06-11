import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import CenterBlock from '@Componnents/Base/CenterBlock';
import HomeCategory from '@Componnents/Home/Category';
import HomeHotTopics from '@Componnents/Home/HotTopics';

import HomeAction from '@Actions/home';

const HomePage = () => {
  const [categoryId, setCategoryId] = useState(0);

  const { homeData } = useSelector(state => ({
    homeData: state.getIn(['home', 'data']),
    homeLoading: state.getIn(['home', 'loading']),
  }), shallowEqual);

  const category = homeData.get('category');
  const hotTopic = homeData.get('hot_topic');

  return (
    <CenterBlock>
      <>
        <HomeCategory
          data={category}
          categoryId={categoryId}
          onChange={setCategoryId}
        />
        <HomeHotTopics
          data={hotTopic}
          categoryId={categoryId}
        />
      </>
    </CenterBlock>
  );
};

HomePage.getInitialProps = ({ store }) => store.dispatch(HomeAction.fetchHomeData());

export default HomePage;
