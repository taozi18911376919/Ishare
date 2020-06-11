import CategoryAvtion from '@Actions/category';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

const defaultState = fromJS([]);

const data = (state = defaultState, action) => {
  switch (action.type) {
    case CategoryAvtion.CATEGORY_SUCCESS:
      return fromJS(action.payload);
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case CategoryAvtion.CATEGORY_REQUEST:
      return true;
    case CategoryAvtion.CATEGORY_FAILURE:
    case CategoryAvtion.CATEGORY_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  data,
  loading,
});
