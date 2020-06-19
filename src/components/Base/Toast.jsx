import React, { useEffect } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Icon from '@mdi/react';
import { mdiCheckboxMarkedCircle, mdiCloseCircle } from '@mdi/js';

import ToastAction from '@Actions/toast';

const useStyles = createUseStyles(({
  root: {
    position: 'fixed',
    zIndex: 999,
    top: '6rem',
    right: 0,
    minWidth: '16rem',
    maxWidth: '24rem',
    borderRadius: [4, 0, 0, 4],
    backgroundColor: '#333845',
    lineHeight: 1,
    boxShadow: '0px 0px 29px 0px rgba(0, 0, 0, 0.05)',
    padding: [8, 16],
    display: 'flex',
    alignItem: 'flex-start',
  },
  myBody: {
    border: 'none',
    color: '#ffffff',
    fontSize: '0.875rem',
    lineHeight: '24px',
  },
  statusIcon: {
    marginRight: '0.75rem',
    flexShrink: 0,
  },
  danger: {
    color: '#f5222d',
  },
  success: {
    color: '#3DBC6C',
  },
}), {
  name: 'Toast',
});

const Toast = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const toast = useSelector(state => state.getIn(['toast']), shallowEqual);

  useEffect(() => {
    if (toast.get('content')) {
      setTimeout(() => {
        dispatch(ToastAction.closeToast());
      }, 3000);
    }
  }, [toast.get('content')]);

  return (
    <div
      className={classNames({
        [classes.root]: true,
        [classes.success]: toast.get('style') === 'success',
        [classes.danger]: toast.get('style') === 'danger',
      })}
    >
      <span className={classNames(classes.statusIcon)}>
        {toast.get('style') === 'success' && (
          <Icon path={mdiCheckboxMarkedCircle} size={1} />
        )}
        {toast.get('style') === 'danger' && (
          <Icon path={mdiCloseCircle} size={1} />
        )}
      </span>
      <div className={classNames(classes.myBody)}>{toast.get('content')}</div>
    </div>
  );
};

export default Toast;
