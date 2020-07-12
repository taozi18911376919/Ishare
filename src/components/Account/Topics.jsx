import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import css from '@Assets/sass/custom.sass';

import UiAction from '@Actions/ui';
import RecommendWrapper from '@Components/Base/RecommendWrapper';
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

const Topics = () => {
  const classes = useStyles();
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

  const showAddTopicModal = () => {
    dispatch(UiAction.showModal('topic'));
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
      <button
        type='button'
        className={classNames(css.button, css['is-link'], classes.control)}
        onClick={showAddTopicModal}
      >
        Add Topic
      </button>
      {data && <RecommendWrapper data={data} isShowDesc />}
      {statusElement()}
    </>
  );
};

export default Topics;
