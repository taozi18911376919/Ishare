/* eslint-disable max-len */
import React, { useRef, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import Icon, { Stack } from '@mdi/react';
import { mdiLogoutVariant } from '@mdi/js';

import css from '@Assets/sass/custom.sass';

import SignAction from '@Actions/sign';
import SearchAction from '@Actions/search';
import UiAction from '@Actions/ui';
import { Link } from '@Server/routes';

const useStyles = createUseStyles(({
  logo: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    fontSize: 24,
    cursor: 'pointer',
    color: '#484848',
    alignSelf: 'stretch',
    fontWeight: 'bolder',
  },
  logoIcon: {
    maxHeight: '36px !important',
    marginRight: 12,
  },
  navItem: {
    '&:hover': {
      color: '#1877f2 !important',
    },
  },
  avatar: {
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
  isSpaced: {
    height: 52,
  },
  '@media screen and (min-width: 1024px)': {
    isSpaced: {
      height: 88,
    },
  },
}), {
  name: 'Header',
});


const menuData = [
  {
    href: '/account',
    label: 'My Topics',
  },
  {
    href: '/account/contributes',
    label: 'My Contribute',
  },
  {
    href: '/account/favorites',
    label: 'My Favorite',
  },
  {
    href: '/account/notification',
    label: 'Notification',
  },
];

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchRef = useRef(null);
  const { pathname } = useRouter();
  const [isActive, setIsActive] = useState(false);
  const { user, seoData } = useSelector(state => ({
    user: state.getIn(['account', 'user']),
    seoData: state.getIn(['home', 'seoData']),
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
    setIsActive(false);
  }, [router]);

  useEffect(() => {
    searchRef.current.addEventListener('keypress', handleEnter);
    return () => {
      searchRef.current.removeEventListener('keypress', handleEnter);
    };
  }, [searchRef.current]);

  const handleShowModal = type => dispatch(UiAction.showModal(type));

  const createSignElement = () => {
    if (user.get('name')) {
      return (
        <div className={classNames(css['navbar-item'], css['has-dropdown'], css['is-hoverable'])}>
          <a className={classNames(css['navbar-link'])}>
            <img src={user.get('avatar')} alt='avatar' className={classNames(classes.avatar)} />
          </a>
          <div className={classNames(css['navbar-dropdown'], css['is-right'])}>
            {menuData.map(item => (
              <Link key={item.label} route={item.href}>
                <a className={classNames(css['navbar-item'], classes.navItem)}>
                  {item.label}
                </a>
              </Link>
            ))}
            <hr className={classNames(css['navbar-divider'])} />
            <a className={classNames(css['navbar-item'], classes.navItem)} onClick={() => dispatch(SignAction.logout())}>
              <span style={{ marginRight: 8 }}>
                <Icon path={mdiLogoutVariant} size={0.75} style={{ marginLeft: -3 }} />
              </span>
              <span>Logout</span>
            </a>
          </div>
        </div>
      );
    }
    return (
      <>
        <div className={classNames(css['navbar-item'])}>
          {(pathname !== '/signin' && pathname !== '/signup') && (
            <div className={classNames(css.buttons)}>
              <button
                type='button'
                className={classNames(css.button, css['is-light'])}
                onClick={() => handleShowModal('login')}
              >
                Log In
              </button>
              <button
                type='button'
                className={classNames(css.button, css['is-primary'])}
                onClick={() => handleShowModal('register')}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  const handleShowAddTopic = () => {
    if (user.get('name')) {
      return dispatch(UiAction.showModal('topic'));
    }
    return dispatch(UiAction.showModal('login'));
  };


  return (
    <>
      <nav className={classNames(css.navbar, css['has-shadow'], classes.isSpaced)}>
        <div className={classNames(css['navbar-brand'])}>
          <a className={classNames(classes.logo, css['navbar-item'])} href='/'>
            <img className={classNames(classes.logoIcon)} src={seoData.get('logo')} alt={seoData.get('name')} />
            <span>{seoData.get('name')}</span>
          </a>
          <a className={classNames(css['navbar-burger'], css.burger, isActive && css['is-active'])} onClick={() => setIsActive(!isActive)}>
            <span />
            <span />
            <span />
          </a>
        </div>
        <div className={classNames(css['navbar-menu'], isActive && css['is-active'])}>
          {(pathname !== '/signin' && pathname !== '/signup') && (
            <div className={classNames(css['navbar-start'])}>
              <div className={classNames(css['navbar-item'])}>
                <button
                  className={classNames(css.button, css['is-light'])}
                  type='button'
                  onClick={handleShowAddTopic}
                >
                  Add Topic
                </button>
              </div>
            </div>
          )}
          <div className={classNames(css['navbar-end'])}>
            <div className={classNames(css['navbar-item'])}>
              <div className={classNames(css.control, css['has-icons-left'])}>
                <input
                  className={classNames(css.input, css['is-rounded'])}
                  type='text'
                  placeholder='Search'
                  ref={searchRef}
                />
                <span className={classNames(css.icon, css['is-small'], css['is-left'])}>
                  <Stack size='18px' viewBox='0 0 1024 1024'>
                    <Icon path='M400.696889 801.393778A400.668444 400.668444 0 1 1 400.696889 0a400.668444 400.668444 0 0 1 0 801.393778z m0-89.031111a311.637333 311.637333 0 1 0 0-623.331556 311.637333 311.637333 0 0 0 0 623.331556zM667.904 601.998222l314.766222 314.823111-62.919111 62.976-314.823111-314.823111z' />
                  </Stack>
                </span>
              </div>
            </div>
            { createSignElement() }
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
