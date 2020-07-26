import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { parseCookies } from 'nookies';
import Head from 'next/head';

import css from '@Assets/sass/custom.sass';

import { Link } from '@Server/routes';

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
    marginLeft: -24,
    marginRight: -24,
    backgroundColor: '#ffffff',
    padding: [32, 12],
    boxShadow: '5px 25px 34px 0px rgba(176,176,176,0.35)',
    marginBottom: 68,
    display: 'flex',
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
    flex: 1,
    flexShrink: 0,
    lineHeight: 1.4,
    margin: [0, 24],
  },
  title: {
    margin: 0,
    fontSize: 24,
  },
  link: {
    color: '#929292',
    ...mutilpellipsis(1),
  },
  buttons: {
    alignSelf: 'flex-end',
  },
  '@media screen and (max-width: 768px)': {
    content: {
      flex: 1,
      marginRight: 0,
    },
    buttons: {
      display: 'none',
    },
  },
}), {
  name: 'TopicsPage',
});

const TopicsPage = ({ pageType }) => {
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
        slug: pageType,
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
      dispatch(UiAction.showModal('login'));
    } else {
      dispatch(UiAction.showModal('contribute'));
    }
  };

  const handleChangeFavorate = () => {
    if (!user.get('name')) {
      dispatch(UiAction.showModal('login'));
    } else {
      setDisabled(true);
      dispatch(TopicAction.favorate({ topic_id: topicInfo.get('id'), type: Boolean(!topicInfo.get('favorite_status')) }));
    }
  };

  const createTopicInfo = () => {
    if (topicInfo.size) {
      return (
        <div className={classNames(classes.root)}>
          <div className={classNames(css.container)} style={{ display: 'flex' }}>
            <img src={topicInfo.get('pic')} alt='' className={classNames(classes.pic)} />
            <div className={classNames(classes.content)}>
              <h2 className={classNames(classes.title)}>{topicInfo.get('title')}</h2>
              <Link route={`/author/${topicInfo.get('author_id')}`} passHref>
                <a className={classNames(classes.link)}>{topicInfo.get('author')}</a>
              </Link>
            </div>
            <div className={classNames(css.buttons, classes.buttons)}>
              <button
                type='button'
                className={classNames(css.button, css['is-text'])}
                onClick={handleShowAddContribute}
              >
                Add Share
              </button>
              <button
                type='button'
                className={classNames(css.button, css['is-text'], disabled && css['is-loading'])}
                onClick={handleChangeFavorate}
              >
                {topicInfo.get('favorite_status') ? 'Cancel Favorate' : 'Favorate'}
              </button>
            </div>
          </div>
        </div>
      );
    }
    return <></>;
  };

  return (
    <>
      <Head>
        <title>{topicInfo.get('title')} - topixin.com</title>
        <meta name='keywords' content={topicInfo.get('seo_keywords')} />
        <meta name='description' content={topicInfo.get('seo_description')} />
      </Head>

      {createTopicInfo()}
      <div className={classNames(css.container)}>
        {!!contributes.size && <ContributeWrapper data={data} half />}
        {statusElement()}
      </div>
    </>
  );
};

TopicsPage.getInitialProps = async ctx => {
  const { store, query: { pageType } } = ctx;
  const { token } = parseCookies(ctx);
  await store.dispatch(TopicAction.fetchTopicData({
    slug: pageType,
    page: 1,
    page_size: 10,
  }, {
    Authorization: `Bearer ${token}`,
  }));
  return {
    pageType,
    store,
  };
};

TopicsPage.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default TopicsPage;
