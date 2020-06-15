import AuthorAction from '@Actions/author';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

const data = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case AuthorAction.AUTHOR_CLEAR:
      return fromJS({});
    case AuthorAction.AUTHOR_SUCCESS:
      return payload;
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case AuthorAction.AUTHOR_REQUEST:
      return true;
    case AuthorAction.AUTHOR_FAILURE:
    case AuthorAction.AUTHOR_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  data,
  loading,
});
