import Config from '@Config';
import NetWork from '@Utils/network';

import UiAction from './ui';
import ToastAction from './toast';

const addContribute = (params, formikBag) => dispatch => {
  const {
    setSubmitting,
    setFieldError,
  } = formikBag;
  return NetWork.post(`${Config.apiBaseUrl}/api/v1/contribute/add`, {
    ...params,
  })
    .then(() => {
      dispatch(ToastAction.openToast('Add Contribute Success', 'success'));
      setSubmitting(false);
      dispatch(UiAction.closeModal());
    })
    .catch(error => {
      const err = JSON.parse(error.message);
      Object.keys(err).map(item => setFieldError(item, err[item]));
      setSubmitting(false);
    });
};

const addTopic = (params, formikBag) => dispatch => {
  const {
    setSubmitting,
    setFieldError,
  } = formikBag;
  return NetWork.post(`${Config.apiBaseUrl}/api/v1/topic/add`, {
    ...params,
  })
    .then(() => {
      dispatch(ToastAction.openToast('Add Topic Success', 'success'));
      setSubmitting(false);
      dispatch(UiAction.closeModal());
    })
    .catch(error => {
      const err = JSON.parse(error.message);
      Object.keys(err).map(item => setFieldError(item, err[item]));
      setSubmitting(false);
    });
};

export default {
  addContribute,
  addTopic,
};
