import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';

import CenterBlock from '@Components/Base/CenterBlock';
import ModuleTilt from '@Components/Base/ModuleTitle';
import TopicWrapper from '@Components/Base/TopicWrapper';
import ContributeWrapper from '@Components/Base/ContributeWrapper';

import AuthorAction from '@Actions/author';

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
    width: 96,
    height: 96,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  content: {
    flexShrink: 0,
    maxWidth: 360,
    lineHeight: 1.4,
    margin: [0, 0, 0, 24],
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
}), {
  name: 'AuthorPage',
});

const AuthorPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const authorData = useSelector(state => state.getIn(['author', 'data']), shallowEqual);
  const authorInfo = authorData.get('author_info');
  const topics = authorData.get('topics');
  const contributes = authorData.get('contributes');

  useEffect(() => () => {
    dispatch(AuthorAction.clearAuthorData());
  }, []);

  const createAuthorInfo = () => {
    if (authorInfo.size) {
      const avatar = authorInfo.get('avatar');
      const name = authorInfo.get('name');
      const email = authorInfo.get('email');
      return (
        <div className={classNames(classes.root)}>
          <img src={avatar} alt='' className={classNames(classes.pic)} />
          <div className={classNames(classes.content)}>
            <h2 className={classNames(classes.title)}>{name}</h2>
            <span className={classNames(classes.link)}>{email}</span>
          </div>
        </div>
      );
    }
    return <></>;
  };

  return (
    <>
      {createAuthorInfo()}
      <CenterBlock>
        <ModuleTilt>
          {authorInfo.get('name')} Topics
        </ModuleTilt>
        <TopicWrapper data={topics} />
        <ModuleTilt>
          {authorInfo.get('name')} Contributes
        </ModuleTilt>
        <ContributeWrapper data={contributes} />
      </CenterBlock>
    </>
  );
};

AuthorPage.getInitialProps = async ({ store, query: { id } }) => {
  await store.dispatch(AuthorAction.fetchAuthorData({ author_id: id }));
  return store;
};

export default AuthorPage;
