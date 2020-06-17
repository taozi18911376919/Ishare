import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Icon from '@mdi/react';
import { mdiLogoutVariant } from '@mdi/js';

import { Link } from '@Server/routes';
import SignAction from '@Actions/sign';

import TopicIcon from '@Components/Icon/Topic';
import ContributeIcon from '@Components/Icon/Contribute';
import NotificationIcon from '@Components/Icon/Notification';
import FavoriteIcon from '@Components/Icon/Favorite';

const useStyles = createUseStyles(({
  root: {
    borderBottom: '1px solid #cfcfcf',
    display: 'flex',
    justifyContent: 'space-between',
    height: 68,
    padding: [0, 48],
    boxSizing: 'border-box',
  },
  start: {
    display: 'flex',
    alignItems: 'center',
  },
  end: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    fontSize: 24,
    cursor: 'pointer',
    color: '#484848',
    alignSelf: 'stretch',
  },
  logoIcon: {
    width: 42,
    height: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    marginRight: 12,
    backgroundColor: '#85A5FF',
    color: '#ffffff',
  },
  button: {
    outline: 'transparent',
    border: 'unset',
    padding: [6, 12],
    cursor: 'pointer',
    borderRadius: 4,
    color: '#929292',
    fontSize: 16,
    transition: 'color .15s',
  },
  addTopics: {
    margin: [0, 36],
    backgroundColor: 'rgba(0, 0, 0, 0.025)',
    '&:hover': {
      color: '#2c2c2c',
    },
  },
  signin: {
    backgroundColor: '#85a5ff',
    color: '#ffffff',
  },
  signup: {
    backgroundColor: 'rgba(0, 0, 0, 0.025)',
    marginLeft: 12,
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: '100%',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.25)',
    padding: [16, 0],
    borderRadius: 6,
    listStyleType: 'none',
    margin: [10, 0, 0, 0],
    visibility: 'hidden',
    backgroundColor: '#ffffff',
    '&:before': {
      content: '""',
      width: '100%',
      height: 10,
      position: 'absolute',
      right: 0,
      top: -10,
    },
  },
  dropItem: {
    display: 'flex',
    padding: [8, 16],
    transition: 'all .3s',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      color: '#85a5ff',
    },
  },
  dropLabel: {
    marginLeft: 8,
    whiteSpace: 'nowrap',
  },
  user: {
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
    padding: [0, 16],
    '&:hover $dropdown': {
      visibility: 'visible',
    },
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: '50%',
  },
}), {
  name: 'Header',
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

const Header = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { user } = useSelector(state => ({
    user: state.getIn(['account', 'user']),
  }), shallowEqual);

  const createSignElement = () => {
    if (user.get('name')) {
      return (
        <div className={classNames(classes.user)}>
          <img src={user.get('avatar')} alt='avatar' className={classNames(classes.avatar)} />
          <ul className={classNames(classes.dropdown)}>
            {menuData.map(item => (
              <Link route={item.href} key={item.label}>
                <li className={classNames(classes.dropItem)}>
                  {item.icon}
                  <span className={classNames(classes.dropLabel)}>{item.label}</span>
                </li>
              </Link>
            ))}

            <li className={classNames(classes.dropItem)} onClick={() => dispatch(SignAction.logout())}>
              <Icon path={mdiLogoutVariant} size={1} />
              <span className={classNames(classes.dropLabel)}>Logout</span>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <>
        <Link route='/signin'>
          <button
            type='button'
            className={classNames(classes.button, classes.signin)}
          >
            Log In
          </button>
        </Link>
        <Link route='/signup'>
          <button
            type='button'
            className={classNames(classes.button, classes.signup)}
          >
            Sign Up
          </button>
        </Link>
      </>
    );
  };

  return (
    <header className={classNames(classes.root)}>
      <div className={classNames(classes.start)}>
        <Link route='/'>
          <h1 className={classNames(classes.logo)}>
            <span className={classNames(classes.logoIcon)}>S</span>
            <span>ishare</span>
          </h1>
        </Link>
        { !!user.size && (
          <button className={classNames(classes.button, classes.addTopics)} type='button'>
            Add Topics
          </button>
        )}
      </div>
      <div className={classNames(classes.end)}>
        {createSignElement()}
      </div>
    </header>
  );
};

export default Header;
