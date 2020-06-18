import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import RecommendWrapper from '@Components/Base/RecommendWrapper';
import Loading from '@Components/Base/Loading';
import ViewMore from '@Components/Base/ViewMore';
import NoMoreData from '@Components/Base/NoMoreData';
import AccountAction from '@Actions/account';

const Topics = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { topic, loading } = useSelector(state => ({
    topic: state.getIn(['account', 'topic']),
    loading: state.getIn(['account', 'loading']),
  }), shallowEqual);
  const data = topic.get('data');
  const currentPage = topic.get('current_page');
  const lastPage = topic.get('last_page');
  const pageSize = topic.get('per_page');

  useEffect(() => {
    if (page !== 1) {
      dispatch(AccountAction.fetchData({
        type: 'TOPIC',
        page,
        page_size: pageSize,
      }));
    }
  }, [page]);

  useEffect(() => () => {
    dispatch(AccountAction.clearData('TOPIC'));
  }, []);

  const handleChangeCurrentPage = () => {
    if (!loading) {
      setPage(page + 1);
    }
  };

  const statusElement = () => {
    if (loading) {
      return <Loading />;
    }
    if (currentPage === lastPage) {
      return <NoMoreData />;
    }
    return <ViewMore onClick={() => handleChangeCurrentPage()} />;
  };

  return (
    <>
      {data && <RecommendWrapper data={data} isShowDesc column />}
      {statusElement()}
    </>
  );
};

export default Topics;
