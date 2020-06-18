/* eslint-disable max-len */
import React, { useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Router from 'next/router';
import Icon from '@mdi/react';
import { mdiLogoutVariant } from '@mdi/js';

import { Link } from '@Server/routes';
import SignAction from '@Actions/sign';
import SearchAction from '@Actions/search';

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
  searchWrapper: {
    position: 'relative',
    '& svg': {
      position: 'absolute',
      left: 10,
      top: 10,
    },
  },
  search: {
    marginRight: 24,
    width: 200,
    height: 36,
    borderRadius: 18,
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#f3f3f3',
    border: 'none',
    fontSize: 14,
    padding: [11, 16, 11, 36],
    transition: 'width .3s linear',
    '&:focus': {
      width: 360,
    },
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
  const searchRef = useRef(null);
  const { user } = useSelector(state => ({
    user: state.getIn(['account', 'user']),
  }), shallowEqual);

  const searchListener = () => {
    const targetValue = searchRef.current.value;
    dispatch(SearchAction.setSearchData(targetValue));
    if (global.window.location.href.indexOf('/search') === -1) {
      Router.push('/search');
    }
    searchRef.current.blur();
  };

  const handleEnter = e => {
    if (e.keyCode === 13) {
      searchListener();
    }
  };

  useEffect(() => {
    searchRef.current.addEventListener('keypress', handleEnter);
    return () => {
      searchRef.current.removeEventListener('keypress', handleEnter);
    };
  }, [searchRef.current]);

  const createSignElement = () => {
    if (user.get('name')) {
      return (
        <div className={classNames(classes.user)}>
          <img src={user.get('avatar')} alt='avatar' className={classNames(classes.avatar)} />
          <ul className={classNames(classes.dropdown)}>
            {menuData.map(item => (
              <li key={item.label}>
                <a className={classNames(classes.dropItem)} href={item.href}>
                  {item.icon}
                  <span className={classNames(classes.dropLabel)}>{item.label}</span>
                </a>
              </li>
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
        <div className={classNames(classes.searchWrapper)}>
          <svg width='16px' height='16px' viewBox='0 0 16 16'>
            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g transform='translate(-1480.000000, -56.000000)' fillRule='nonzero'>
                <g transform='translate(1480.000000, 56.000000)'>
                  <rect fill='#000000' opacity='0' x='0' y='0' width='15.9843902' height='15.9843902' />
                  <path d='M15.7437388,15.7444048 C15.5916211,15.8981842 15.3843053,15.9847177 15.1680001,15.9847177 C14.951695,15.9847177 14.7443792,15.8981842 14.5922615,15.7444048 L12.2280367,13.3795141 C12.0176446,13.1749255 11.9336944,12.87291 12.0083264,12.5890942 C12.0829584,12.3052784 12.3046125,12.0836244 12.5884282,12.0089924 C12.872244,11.9343604 13.1742595,12.0183106 13.3788481,12.2287027 L15.7437388,14.5929274 C15.8973525,14.7451338 15.9837711,14.9524164 15.9837711,15.1686661 C15.9837711,15.3849158 15.8973525,15.5921984 15.7437388,15.7444048 L15.7437388,15.7444048 Z M6.97080009,13.9416065 C5.04612137,13.9416065 3.30392083,13.161739 2.04255697,11.9003751 L2.21171559,12.2293687 C0.845127102,10.8894193 0,8.8961448 0,6.97080009 C0,3.12077665 3.12077665,0 6.97080009,0 C10.8208235,0 13.9422661,3.12077665 13.9422661,6.97080009 C13.9422661,8.8961448 13.161739,10.6390113 11.8997092,11.9003751 C10.5937725,13.2094863 8.81991787,13.9440985 6.97080009,13.9416065 L6.97080009,13.9416065 Z M6.99277738,1.3319576 C3.86620904,1.33214151 1.3317737,3.86687503 1.3319576,6.99344337 C1.33214151,10.1200117 3.86687503,12.6544471 6.99344337,12.6542631 C10.1200117,12.6540792 12.6544471,10.1193457 12.6542631,6.99277738 C12.6540792,3.86620904 10.1193457,1.3317737 6.99277738,1.3319576 Z' fill='#929292' />
                </g>
              </g>
            </g>
          </svg>
          <input className={classNames(classes.search)} ref={searchRef} />
        </div>
        {createSignElement()}
      </div>
    </header>
  );
};

export default Header;
