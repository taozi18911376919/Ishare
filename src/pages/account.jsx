import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Link } from '@Server/routes';
import CenterBlock from '@Components/Base/CenterBlock';
import AccountAvatar from '@Components/Base/AccountAvatar';
import AccountTopics from '@Components/Account/Topics';
import TopicIcon from '@Components/Icon/Topic';
import ContributeIcon from '@Components/Icon/Contribute';
import NotificationIcon from '@Components/Icon/Notification';
import FavoriteIcon from '@Components/Icon/Favorite';

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
  wrapper: {
    flex: 1,
    display: 'flex',
  },
  side: {
    listStyleType: 'none',
    margin: 0,
    padding: [48, 0],
    borderRight: '1px solid #cfcfcf',
  },
  item: {
    cursor: 'pointer',
    padding: [12, 24],
    margin: [12, 0],
    flexShrink: 0,
    '&:hover': {
      color: '#1877f2',
    },
    '& svg': {
      marginRight: '0.5em',
    },
  },
  active: {
    color: '#1877f2',
  },
  main: {
    flex: 1,
    padding: [48, 0, 48, 48],
  },
}), {
  name: 'Author',
});

const menuData = [
  {
    href: '/account',
    label: 'My Topics',
    icon: <TopicIcon />,
  },
  {
    href: '/account/contributes',
    label: 'My Contribute',
    icon: <ContributeIcon />,
  },
  {
    href: '/account/favorites',
    label: 'My Favorite',
    icon: <FavoriteIcon />,
  },
  {
    href: '/account/notification',
    label: 'Notification',
    icon: <NotificationIcon />,
  },
];

const Author = props => {
  const { pageType, pathname } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  // const authorData = useSelector(state => state.getIn(['author', 'data']), shallowEqual);
  // const authorInfo = authorData.get('author_info');

  // useEffect(() => () => {
  //   dispatch(AuthorAction.clearAuthorData());
  // }, []);

  // const createAuthorInfo = () => {
  //   if (authorInfo.size) {
  //     const avatar = authorInfo.get('avatar');
  //     const name = authorInfo.get('name');
  //     const email = authorInfo.get('email');
  //     return (
  //       <div className={classNames(classes.root)}>
  //         {avatar ? <img src={avatar} alt='' className={classNames(classes.pic)} /> : <AccountAvatar name={name} />}
  //         <div className={classNames(classes.content)}>
  //           <h2 className={classNames(classes.title)}>{name}</h2>
  //           <span className={classNames(classes.link)}>{email}</span>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return <></>;
  // };

  return (
    <>
      {/* {createAuthorInfo()} */}
      <CenterBlock className={classNames(classes.wrapper)}>
        <ul className={classNames(classes.side)}>
          {
            menuData.map(item => (
              <Link route={item.href} key={item.label}>
                <li
                  className={classNames({
                    [classes.item]: true,
                    [classes.active]: item.href === (pageType ? `${pathname}/${pageType}` : pathname),
                  })}
                >
                  {item.icon}
                  {item.label}
                </li>
              </Link>
            ))
          }
        </ul>
        <div className={classNames(classes.main)}>
          <AccountTopics />
        </div>
      </CenterBlock>
    </>
  );
};

Author.propTypes = {
  pathname: PropTypes.string.isRequired,
  pageType: PropTypes.string,
};

Author.defaultProps = {
  pageType: '',
};

Author.getInitialProps = async ({ store, query: { pageType }, pathname }) => {
  // await store.dispatch(AuthorAction.fetchAuthorData({ author_id: id }));
  return { pageType, store, pathname };
};

export default Author;
