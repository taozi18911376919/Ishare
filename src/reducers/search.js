import SearchAction from '@Actions/search';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

const searchData = (state = '', { type, payload }) => {
  switch (type) {
    case SearchAction.SEARCH_SET_DATA:
      return payload;
    default:
      return state;
  }
};

const topic = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case SearchAction.SEARCH_TOPIC_SUCCESS:
      return state.mergeDeep(payload);
    case SearchAction.SEARCH_TOPIC_CLEAR:
      return fromJS({});
    default:
      return state;
  }
};

const contribute = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case SearchAction.SEARCH_CONTRIBUTE_SUCCESS:
      return state.mergeDeep(payload);
    case SearchAction.SEARCH_CONTRIBUTE_CLEAR:
      return fromJS({});
    default:
      return state;
  }
};


const loading = (state = false, action) => {
  switch (action.type) {
    case SearchAction.SEARCH_REQUEST:
      return true;
    case SearchAction.SEARCH_TOPIC_SUCCESS:
    case SearchAction.SEARCH_CONTRIBUTE_SUCCESS:
    case SearchAction.SEARCH_FAILURE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  searchData,
  topic,
  contribute,
  loading,
});
