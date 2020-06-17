import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import ContributeWrapper from '@Components/Base/ContributeWrapper';
import Loading from '@Components/Base/Loading';
import ViewMore from '@Components/Base/ViewMore';
import NoMoreData from '@Components/Base/NoMoreData';
import AccountAction from '@Actions/account';

const Contribute = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { contribute, loading } = useSelector(state => ({
    contribute: state.getIn(['account', 'contribute']),
    loading: state.getIn(['account', 'loading']),
  }), shallowEqual);
  const data = contribute.get('data');
  const currentPage = contribute.get('current_page');
  const lastPage = contribute.get('last_page');
  const pageSize = contribute.get('per_page');

  useEffect(() => {
    if (page !== 1) {
      dispatch(AccountAction.fetchData({
        type: 'CONTRIBUTE',
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
    dispatch(AccountAction.clearData('CONTRIBUTE'));
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
      {data && <ContributeWrapper data={data} isColumn={false} />}
      {statusElement()}
    </>
  );
};

export default Contribute;
