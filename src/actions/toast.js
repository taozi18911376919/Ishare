const prefix = 'TOASTS';

const OPEN_TOASTS = `${prefix}.OPEN_TOASTS`;
const CLOSE_TOASTS = `${prefix}.CLOSE_TOASTS`;

const openToast = (message, style) => dispatch => dispatch({
  type: OPEN_TOASTS,
  payload: {
    message,
    style,
  },
});

const closeToast = () => dispatch => dispatch({
  type: CLOSE_TOASTS,
});

const OPEN_MIDDLE_TOASTS = `${prefix}.OPEN_MIDDLE_TOASTS`;
const CLOSE_MIDDLE_TOASTS = `${prefix}.CLOSE_MIDDLE_TOASTS`;

const openMiddleToast = message => dispatch => dispatch({
  type: OPEN_MIDDLE_TOASTS,
  payload: {
    message,
  },
});

const closeMiddleToast = () => dispatch => dispatch({
  type: CLOSE_MIDDLE_TOASTS,
});

export default {
  OPEN_TOASTS,
  CLOSE_TOASTS,
  openToast,
  closeToast,

  OPEN_MIDDLE_TOASTS,
  CLOSE_MIDDLE_TOASTS,
  openMiddleToast,
  closeMiddleToast,
};
