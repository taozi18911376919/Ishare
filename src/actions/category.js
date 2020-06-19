import Config from '@Config';
import NetWork from '@Utils/network';

const prefix = 'ALL';

const CATEGORY_SUCCESS = `${prefix}_CATEGORY_SUCCESS`;
const CATEGORY_FAILURE = `${prefix}_CATEGORY_FAILURE`;

const TOPIC_SUCCESS = `${prefix}_TOPIC_SUCCESS`;
const TOPIC_FAILURE = `${prefix}_TOPIC_FAILURE`;

const fetchCategory = () => dispatch => {
  try {
    NetWork.post(`${Config.apiBaseUrl}/api/v1/category/all`).then(res => dispatch({
      type: CATEGORY_SUCCESS,
      payload: res,
    }));
  } catch (err) {
    dispatch({
      type: CATEGORY_FAILURE,
      payload: err.message,
    });
  }
};

const fetchTopic = () => dispatch => {
  try {
    NetWork.post(`${Config.apiBaseUrl}/api/v1/topic/all`).then(res => dispatch({
      type: TOPIC_SUCCESS,
      payload: res,
    }));
  } catch (err) {
    dispatch({
      type: TOPIC_FAILURE,
      payload: err.message,
    });
  }
};

export default {
  CATEGORY_SUCCESS,
  TOPIC_SUCCESS,
  fetchCategory,
  fetchTopic,
};
