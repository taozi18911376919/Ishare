import CategoryAvtion from '@Actions/category';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

const categorys = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case CategoryAvtion.CATEGORY_SUCCESS:
      return payload.get('categorys');
    default:
      return state;
  }
};

const topics = (state = fromJS({}), { type, payload }) => {
  switch (type) {
    case CategoryAvtion.TOPIC_SUCCESS:
      return payload.get('topics');
    default:
      return state;
  }
};

export default combineReducers({
  categorys,
  topics,
});
