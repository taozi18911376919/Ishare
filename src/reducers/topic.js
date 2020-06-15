import TopicAction from '@Actions/topic';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

const topicInfo = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case TopicAction.TOPIC_CLEAR:
      return fromJS({});
    case TopicAction.TOPIC_SUCCESS:
      return payload.get('topic_info');
    default:
      return state;
  }
};

const contributes = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case TopicAction.TOPIC_CLEAR:
      return fromJS({});
    case TopicAction.TOPIC_SUCCESS:
      return state.mergeDeep(payload.get('contributes'));
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case TopicAction.TOPIC_REQUEST:
      return true;
    case TopicAction.TOPIC_FAILURE:
    case TopicAction.TOPIC_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  topicInfo,
  contributes,
  loading,
});
