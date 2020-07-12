import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import css from '@Assets/sass/custom.sass';

import UiAction from '@Actions/ui';

import TopicForm from '@Components/Form/TopicForm';
import ContributeForm from '@Components/Form/ContributeForm';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import LoginModal from './LoginModal';

const useStyles = createUseStyles(({
  root: {
    borderRadius: 5,
    maxWidth: 540,
  },
  cardBody: {
    padding: 24,
  },
}), {
  name: 'Modal',
});

const Modal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const { modalName } = useSelector(state => ({
    modalName: state.getIn(['ui', 'modalName']),
  }), shallowEqual);

  const createElement = () => {
    switch (modalName) {
      case 'login':
        return <LoginModal />;
      case 'register':
        return <RegisterModal />;
      case 'forgotPassword':
        return <ForgotPasswordModal />;
      case 'topic':
        return <TopicForm />;
      case 'contribute':
        return <ContributeForm />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (modalName) {
      switch (modalName) {
        case 'login':
          setTitle('Log In');
          break;
        case 'register':
          setTitle('Sign Up');
          break;
        case 'forgotPassword':
          setTitle('Reset Password');
          break;
        case 'topic':
          setTitle('Add Topic');
          break;
        case 'contribute':
          setTitle('Add Contribute');
          break;
        default:
          setTitle('');
          break;
      }
    }
  }, [modalName]);


  return (
    <>
      {modalName && (
        <div className={classNames(css.modal, css['is-active'])}>
          <div className={classNames(css['modal-background'])} />
          <div className={classNames(css['modal-card'], classes.root)}>
            <header className={classNames(css['modal-card-head'])}>
              <p className={classNames(css['modal-card-title'])}>{title}</p>
              <button
                type='button'
                className={classNames(css.delete)}
                aria-label='close'
                onClick={() => dispatch(UiAction.closeModal())}
              />
            </header>
            <section className={classNames(css['modal-card-body'], classes.cardBody)}>
              {createElement()}
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
