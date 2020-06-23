import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { parseCookies } from 'nookies';

import { Link } from '@Server/routes';

import CenterBlock from '@Components/Base/CenterBlock';
import ContributeWrapper from '@Components/Base/ContributeWrapper';
import Loading from '@Components/Base/Loading';
import ViewMore from '@Components/Base/ViewMore';
import NoMoreData from '@Components/Base/NoMoreData';

import TopicAction from '@Actions/topic';
import UiAction from '@Actions/ui';

const mutilpellipsis = line => ({
  display: '-webkit-box',
  '-webkit-line-clamp': line,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
});

const useStyles = createUseStyles(({
  root: {
    backgroundColor: '#ffffff',
    padding: [24, 0],
    boxShadow: '5px 25px 34px 0px rgba(176,176,176,0.35)',
    marginBottom: 68,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    width: 114,
    height: 114,
    objectFit: 'cover',
    borderRadius: 4,
    boxShadow: '0 0 6px rgba(0,0,0,.5)',
  },
  content: {
    flexShrink: 0,
    maxWidth: 360,
    lineHeight: 1.4,
    margin: [0, 24],
  },
  title: {
    ...mutilpellipsis(1),
    margin: 0,
    fontSize: 24,
  },
  link: {
    color: '#929292',
    ...mutilpellipsis(1),
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    justifycontent: 'center',
  },
  control: {
    outline: 'none',
    width: 160,
    height: 40,
    lineHeight: '40px',
    fontSize: 16,
    border: 0,
    textAlign: 'center',
    padding: 0,
    margin: 0,
    backgroundColor: '#f5222d',
    borderRadius: 4,
    color: '#ffffff',
    cursor: 'pointer',
    '& + &': {
      marginTop: 20,
      backgroundColor: '#1877f2',
      '&:disabled': {
        opacoty: 0.9,
        ccursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
}), {
  name: 'TopicsPage',
});

const TopicsPage = props => {
  const { id } = props;
  const [page, setPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    user,
    topicInfo,
    contributes,
    topicLoading,
  } = useSelector(state => ({
    user: state.getIn(['account', 'user']),
    topicLoading: state.getIn(['topic', 'loading']),
    topicInfo: state.getIn(['topic', 'topicInfo']),
    contributes: state.getIn(['topic', 'contributes']),
  }), shallowEqual);

  const data = contributes.get('data');
  const currentPage = contributes.get('current_page');
  const lastPage = contributes.get('last_page');
  const pageSize = contributes.get('per_page');

  useEffect(() => {
    if (page !== 1) {
      dispatch(TopicAction.fetchTopicData({
        topic_id: +id,
        page,
        page_size: pageSize,
      }));
    }
  }, [page]);

  useEffect(() => () => {
    dispatch(TopicAction.clearTopicData());
  }, []);

  const handleChangeCurrentPage = () => {
    if (!topicLoading) {
      setPage(page + 1);
    }
  };

  const statusElement = () => {
    if (topicLoading) {
      return <Loading />;
    }
    if (currentPage === lastPage) {
      return <NoMoreData />;
    }
    return <ViewMore onClick={() => handleChangeCurrentPage()} />;
  };

  useEffect(() => {
    setDisabled(false);
  }, [topicInfo.get('favorite_status')]);

  const handleShowAddContribute = () => {
    if (!user.get('name')) {
      dispatch(UiAction.showModal('signin'));
    } else {
      dispatch(UiAction.showModal('addContribute'));
    }
  };

  const handleChangeFavorate = () => {
    if (!user.get('name')) {
      dispatch(UiAction.showModal('signin'));
    } else {
      setDisabled(true);
      dispatch(TopicAction.favorate({ topic_id: +id, type: Boolean(!topicInfo.get('favorite_status')) }));
    }
  };

  const createTopicInfo = () => {
    if (topicInfo.size) {
      return (
        <div className={classNames(classes.root)}>
          <img src={topicInfo.get('pic')} alt='' className={classNames(classes.pic)} />
          <div className={classNames(classes.content)}>
            <h2 className={classNames(classes.title)}>{topicInfo.get('title')}</h2>
            <Link route={`/author/${topicInfo.get('author_id')}`} passHref>
              <a className={classNames(classes.link)}>{topicInfo.get('author')}</a>
            </Link>
          </div>
          <div className={classNames(classes.controls)}>
            <button
              type='button'
              className={classNames(classes.control)}
              onClick={handleShowAddContribute}
            >
              Add contribute
            </button>
            <button
              type='button'
              className={classNames(classes.control)}
              onClick={handleChangeFavorate}
              disabled={disabled}
            >
              {topicInfo.get('favorite_status') ? 'Cancel Favorate' : 'Favorate'}
            </button>
          </div>
        </div>
      );
    }
    return <></>;
  };

  return (
    <>
      {createTopicInfo()}
      <CenterBlock>
        <>
          {!!contributes.size && <ContributeWrapper data={data} />}
          {statusElement()}
        </>
      </CenterBlock>
    </>
  );
};

TopicsPage.getInitialProps = async ctx => {
  const { store, query: { id } } = ctx;
  const { token } = parseCookies(ctx);
  await store.dispatch(TopicAction.fetchTopicData({
    topic_id: +id,
    page: 1,
    page_size: 10,
  }, {
    Authorization: `Bearer ${token}`,
  }));
  return {
    id,
    store,
  };
};

TopicsPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TopicsPage;
