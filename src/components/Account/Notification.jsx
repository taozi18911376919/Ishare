import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import ContributeWrapper from '@Components/Base/ContributeWrapper';
import Loading from '@Components/Base/Loading';
import ViewMore from '@Components/Base/ViewMore';
import NoMoreData from '@Components/Base/NoMoreData';
import AccountAction from '@Actions/account';
import RemindIcon from '@Components/Icon/Remind';

const useStyles = createUseStyles(({
  root: {
    margin: [0, 0, 24, 0],
    fontSize: 18,
    color: '#f5222d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      marginRight: 8,
    },
  },
}), {
  name: 'Account-Notification',
});

const Notification = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { contribute, loading } = useSelector(state => ({
    contribute: state.getIn(['account', 'notification']),
    loading: state.getIn(['account', 'loading']),
  }), shallowEqual);
  const data = contribute.get('data');
  const currentPage = contribute.get('current_page');
  const lastPage = contribute.get('last_page');
  const pageSize = contribute.get('per_page');
  const topicUpdateCount = contribute.get('topic_update_count');

  useEffect(() => {
    if (page !== 1) {
      dispatch(AccountAction.fetchData({
        type: 'NOTIFICATION',
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
    dispatch(AccountAction.clearData('NOTIFICATION'));
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
      <div className={classNames(classes.root)}><RemindIcon /> {topicUpdateCount} topics was update</div>
      {data && <ContributeWrapper data={data} fullWidth isColumn={false} />}
      {statusElement()}
    </>
  );
};

export default Notification;
