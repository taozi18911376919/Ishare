import HomeAction from '@Actions/home';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';


const data = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case HomeAction.HOME_SUCCESS:
      return payload;
    default:
      return state;
  }
};

const seoData = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case HomeAction.SEO_SUCCESS:
      return payload;
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case HomeAction.HOME_REQUEST:
      return true;
    case HomeAction.HOME_FAILURE:
    case HomeAction.HOME_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  data,
  seoData,
  loading,
});
