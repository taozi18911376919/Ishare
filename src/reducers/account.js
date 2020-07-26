import AccountAction from '@Actions/account';
import SignAction from '@Actions/sign';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

const user = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case AccountAction.ACCOUNT_USERINFO_SUCCESS:
      return payload.get('user_info');
    case SignAction.LOGIN_SUCCESS:
      return payload.get('user');
    case AccountAction.ACCOUNT_USERINFO_CLEAR:
      return fromJS({});
    default:
      return state;
  }
};

const topic = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case AccountAction.ACCOUNT_TOPIC_SUCCESS:
      return state.mergeDeep(payload.get('topic'));
    case AccountAction.ACCOUNT_TOPIC_CLEAR:
      return fromJS({});
    default:
      return state;
  }
};

const contribute = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case AccountAction.ACCOUNT_CONTRIBUTE_SUCCESS:
      return state.mergeDeep(payload.get('contribute'));
    case AccountAction.ACCOUNT_CONTRIBUTE_CLEAR:
      return fromJS({});
    default:
      return state;
  }
};

const favorite = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case AccountAction.ACCOUNT_FAVORITE_SUCCESS:
      return state.mergeDeep(payload.get('favorite'));
    case AccountAction.ACCOUNT_FAVORITE_CLEAR:
      return fromJS({});
    default:
      return state;
  }
};

const notification = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case AccountAction.ACCOUNT_NOTIFICATION_SUCCESS:
      return state.mergeDeep(payload.get('notification'));
    case AccountAction.ACCOUNT_NOTIFICATION_CLEAR:
      return fromJS({});
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case AccountAction.ACCOUNT_REQUEST:
      return true;
    case AccountAction.ACCOUNT_FAILURE:
    case AccountAction.ACCOUNT_TOPIC_SUCCESS:
    case AccountAction.ACCOUNT_CONTRIBUTE_SUCCESS:
    case AccountAction.ACCOUNT_FAVORITE_SUCCESS:
    case AccountAction.ACCOUNT_NOTIFICATION_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  topic,
  contribute,
  favorite,
  notification,
  loading,
});
