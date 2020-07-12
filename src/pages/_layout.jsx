/* eslint-disable max-len */
import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';
import Icon, { Stack } from '@mdi/react';

import css from '@Assets/sass/custom.sass';

import Header from '@Components/Base/Header';
import Footer from '@Components/Base/Footer';
import Toast from '@Components/Base/Toast';

import Modal from '@Components/Modal';

const useStyles = createUseStyles(({
  root: {
    width: '100%',
    flex: 1,
    padding: [0, 24],
    boxSizing: 'border-box',
  },
  backTop: {
    position: 'fixed',
    right: 24,
    bottom: 48,
  },
}), {
  name: 'Layout',
});

const Layout = ({ children, pathname }) => {
  const classes = useStyles();
  const { toast } = useSelector(state => ({
    toast: state.getIn(['toast']),
  }), shallowEqual);

  const handleBackTop = () => {
    global.window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {pathname !== '/redirect' && <Header />}
      <main className={classNames(classes.root)}>
        { children }
      </main>
      {pathname !== '/redirect' && <Footer />}
      <Modal />
      {toast.get('content') && <Toast />}
      <button type='button' className={classNames(css.button, css['is-link'], classes.backTop)} onClick={handleBackTop}>
        <span className={classNames(css.icon)}>
          <Stack viewBox='0 0 1035 1024' size='24px'>
            <Icon path='M508.20752 6.826464a43.992771 43.992771 0 0 0-30.339842 12.894433L53.109893 439.16921C37.181476 455.097627 31.113508 470.267548 35.664484 481.644988c4.550976 11.377441 19.720897 17.445409 43.234275 17.445409h257.888655v439.927706A85.710053 85.710053 0 0 0 424.772955 1023.96966h172.178602a85.710053 85.710053 0 0 0 86.468549-84.951557v-439.927706h258.647151c22.754881 0 37.924802-6.067968 43.234275-17.445409 5.309472-11.377441 0-26.547362-18.203905-42.475778L541.581346 19.720897A43.992771 43.992771 0 0 0 508.20752 6.826464z' />
          </Stack>
        </span>
      </button>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  pathname: PropTypes.string.isRequired,
};

export default Layout;
