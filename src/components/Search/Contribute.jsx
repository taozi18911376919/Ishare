import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import ContributeWrapper from '@Components/Base/ContributeWrapper';
import Loading from '@Components/Base/Loading';
import ViewMore from '@Components/Base/ViewMore';
import NoMoreData from '@Components/Base/NoMoreData';
import SearchAction from '@Actions/search';

const Contribute = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { searchData, contribute, loading } = useSelector(state => ({
    searchData: state.getIn(['search', 'searchData']),
    contribute: state.getIn(['search', 'contribute']),
    loading: state.getIn(['search', 'loading']),
  }), shallowEqual);
  const data = contribute.get('data');
  const currentPage = contribute.get('current_page');
  const lastPage = contribute.get('last_page');
  const pageSize = contribute.get('per_page');

  useEffect(() => {
    if (page !== 1) {
      dispatch(SearchAction.fetchData({
        keywords: searchData,
        search_type: 'CONTRIBUTE',
        page,
        page_size: pageSize,
      }));
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
    dispatch(SearchAction.clearData('CONTRIBUTE'));
    dispatch(SearchAction.fetchData({
      keywords: searchData,
      search_type: 'CONTRIBUTE',
      page: 1,
      page_size: 10,
    }));
  }, [searchData]);

  const handleChangeCurrentPage = () => {
    if (!loading) {
      setPage(page + 1);
    }
  };

  useEffect(() => () => {
    dispatch(SearchAction.clearData('CONTRIBUTE'));
  }, []);

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
      {data && <ContributeWrapper data={data} isColumn={false} fullWidth />}
      {statusElement()}
    </>
  );
};

export default Contribute;
