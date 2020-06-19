import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';

import Header from '@Components/Base/Header';
import Footer from '@Components/Base/Footer';
import ContributeForm from '@Components/Form/ContributeForm';
import TopicForm from '@Components/Form/TopicForm';
import SignInModal from '@Components/Form/SignInModal';
import ForgetPassword from '@Components/Form/ForgetPassword';
import Toast from '@Components/Base/Toast';

const useStyles = createUseStyles(({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}), {
  name: 'Layout',
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const { toast, show } = useSelector(state => ({
    toast: state.getIn(['toast']),
    show: state.getIn(['ui', 'show']),
  }), shallowEqual);


  const modalElement = () => {
    switch (show) {
      case 'addContribute':
        return <ContributeForm />;
      case 'addTopic':
        return <TopicForm />;
      case 'signin':
        return <SignInModal />;
      case 'forgetPassword':
        return <ForgetPassword />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Header />
      <main className={classNames(classes.root)}>
        { children }
      </main>
      <Footer />
      {modalElement()}
      {toast.get('content') && <Toast />}
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
