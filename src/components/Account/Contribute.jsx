import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import css from '@Assets/sass/custom.sass';

import UiAction from '@Actions/ui';
import ContributeWrapper from '@Components/Base/ContributeWrapper';
import Loading from '@Components/Base/Loading';
import ViewMore from '@Components/Base/ViewMore';
import NoMoreData from '@Components/Base/NoMoreData';
import AccountAction from '@Actions/account';


const useStyles = createUseStyles(({
  control: {
    display: 'block',
    margin: [20, 'auto', 36],
  },
}), {
  name: 'Account-Topics',
});

const Contribute = () => {
  const classes = useStyles();
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
    if (loading) {
      return <Loading />;
    }
    if (currentPage === lastPage) {
      return <NoMoreData />;
    }
    return <ViewMore onClick={() => handleChangeCurrentPage()} />;
  };

  const showAddContributeModal = () => {
    dispatch(UiAction.showModal('contribute'));
  };

  return (
    <>
      <button
        type='button'
        className={classNames(css.button, css['is-link'], classes.control)}
        onClick={showAddContributeModal}
      >
        Add Share
      </button>
      {data && <ContributeWrapper data={data} />}
      {statusElement()}
    </>
  );
};

export default Contribute;
