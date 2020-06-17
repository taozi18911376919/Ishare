import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import RecommendWrapper from '@Components/Base/RecommendWrapper';
import Loading from '@Components/Base/Loading';
import ViewMore from '@Components/Base/ViewMore';
import NoMoreData from '@Components/Base/NoMoreData';
import AccountAction from '@Actions/account';

const Favorite = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { favorite, loading } = useSelector(state => ({
    favorite: state.getIn(['account', 'favorite']),
    loading: state.getIn(['account', 'loading']),
  }), shallowEqual);
  const data = favorite.get('data');
  const currentPage = favorite.get('current_page');
  const lastPage = favorite.get('last_page');
  const pageSize = favorite.get('per_page');

  useEffect(() => {
    if (page !== 1) {
      dispatch(AccountAction.fetchData({
        type: 'FAVORITE',
        page,
        page_size: pageSize,
      }));
    }
  }, [page]);

  const handleChangeCurrentPage = () => {
    if (!loading) {
      setPage(page + 1);
    }
  };

  useEffect(() => () => {
    dispatch(AccountAction.clearData('FAVORITE'));
  }, []);

  const statusElement = () => {
    if (currentPage === lastPage) {
      return <NoMoreData />;
    }
    if (loading) {
      return <Loading />;
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

export default Favorite;
