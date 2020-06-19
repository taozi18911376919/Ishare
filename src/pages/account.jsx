import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';


import { Link } from '@Server/routes';
import CenterBlock from '@Components/Base/CenterBlock';
import AccountTopics from '@Components/Account/Topics';
import AccountContribute from '@Components/Account/Contribute';
import AccountFavorite from '@Components/Account/Favorite';
import AccountNotification from '@Components/Account/Notification';
import TopicIcon from '@Components/Icon/Topic';
import ContributeIcon from '@Components/Icon/Contribute';
import NotificationIcon from '@Components/Icon/Notification';
import FavoriteIcon from '@Components/Icon/Favorite';

import AccountAction from '@Actions/account';
import { useSelector, shallowEqual } from 'react-redux';

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
    padding: [24, 0],
    borderRight: '1px solid #cfcfcf',
    flexShrink: 0,
  },
  item: {
    cursor: 'pointer',
    padding: [12, 24, 12, 0],
    margin: [12, 0],
    flexShrink: 0,
    color: '#FFD666',
    '& span': {
      color: '#2c2c2c',
    },
    '&:hover span': {
      color: '#1877f2',
    },
    '& svg': {
      marginRight: '0.5em',
    },
  },
  active: {
    '& span': {
      color: '#1877f2',
    },
  },
  main: {
    flex: 1,
    padding: [48, 0, 48, 48],
  },
}), {
  name: 'AccountPage',
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

const AccountPage = props => {
  const { pageType, pathname } = props;
  const classes = useStyles();

  const user = useSelector(state => state.getIn(['account', 'user']), shallowEqual);

  const createPageElement = () => {
    switch (pageType) {
      case 'contributes':
        return <AccountContribute />;
      case 'favorites':
        return <AccountFavorite />;
      case 'notification':
        return <AccountNotification />;
      default:
        return <AccountTopics />;
    }
  };


  const createUserInfo = () => {
    if (user.get('name')) {
      const avatar = user.get('avatar');
      const name = user.get('name');
      const email = user.get('email');
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
      {createUserInfo()}
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
                  <span>{item.label}</span>
                </li>
              </Link>
            ))
          }
        </ul>
        <div className={classNames(classes.main)}>
          {createPageElement()}
        </div>
      </CenterBlock>
    </>
  );
};

AccountPage.propTypes = {
  pathname: PropTypes.string.isRequired,
  pageType: PropTypes.string,
};

AccountPage.defaultProps = {
  pageType: '',
};

AccountPage.getInitialProps = async ctx => {
  const { store, query: { pageType }, pathname } = ctx;
  const { token } = parseCookies(ctx);
  let type = 'TOPIC';

  switch (pageType) {
    case 'contributes':
      type = 'CONTRIBUTE';
      break;
    case 'favorites':
      type = 'FAVORITE';
      break;
    case 'notification':
      type = 'NOTIFICATION';
      break;
    default:
      type = 'TOPIC';
      break;
  }

  await store.dispatch(AccountAction.fetchData({
    type,
    page: 1,
    page_size: 10,
  }, {
    Authorization: `Bearer ${token}`,
  }));
  return { pageType, store, pathname };
};

export default AccountPage;
