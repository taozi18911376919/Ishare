import UiAction from '@Actions/ui';
import { combineReducers } from 'redux-immutable';

const modalName = (state = '', { type, payload }) => {
  switch (type) {
    case UiAction.UI_SHOW:
      return payload;
    case UiAction.UI_COLSE:
      return '';
    default:
      return state;
  }
};


export default combineReducers({
  modalName,
});
