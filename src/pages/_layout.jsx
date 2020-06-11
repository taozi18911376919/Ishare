import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Header from '@Componnents/Base/Header';
import Footer from '@Componnents/Base/Footer';

const useStyles = createUseStyles(({
  root: {
    flex: 1,
  },
}), {
  name: 'Layout',
});

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <main className={classNames(classes.root)}>
        { children }
      </main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default Layout;
