import { combineReducers } from 'redux-immutable';
import Toast from '@Actions/toast';

const open = (state = false, { type }) => {
  switch (type) {
    case Toast.OPEN_TOASTS:
      return true;
    case Toast.CLOSE_TOASTS:
      return false;
    default:
      return state;
  }
};

const content = (state = '', { type, payload }) => {
  switch (type) {
    case Toast.OPEN_TOASTS:
      return payload.message || '';
    case Toast.CLOSE_TOASTS:
      return '';
    default:
      return state;
  }
};

const style = (state = '', { type, payload }) => {
  switch (type) {
    case Toast.OPEN_TOASTS:
      return payload.style || '';
    case Toast.CLOSE_TOASTS:
      return '';
    default:
      return state;
  }
};

const middleOpen = (state = false, { type }) => {
  switch (type) {
    case Toast.OPEN_MIDDLE_TOASTS:
      return true;
    case Toast.CLOSE_MIDDLE_TOASTS:
      return false;
    default:
      return state;
  }
};

const middleContent = (state = '', { type, payload }) => {
  switch (type) {
    case Toast.OPEN_MIDDLE_TOASTS:
      return payload.message || '';
    case Toast.CLOSE_MIDDLE_TOASTS:
      return '';
    default:
      return state;
  }
};

export default combineReducers({
  open,
  content,
  style,

  middleOpen,
  middleContent,
});
