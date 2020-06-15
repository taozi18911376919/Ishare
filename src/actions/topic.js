import Config from '@Config';
import NetWork from '@Utils/network';

const prefix = 'TOPIC';

const TOPIC_REQUEST = `${prefix}_REQUEST`;
const TOPIC_SUCCESS = `${prefix}_SUCCESS`;
const TOPIC_FAILURE = `${prefix}_FAILURE`;
const TOPIC_CLEAR = `${prefix}_CLEAR`;

const fetchTopicData = query => dispatch => {
  dispatch({ type: TOPIC_REQUEST });
  return NetWork.post(`${Config.apiBaseUrl}/topic/index`, { ...query })
    .then(data => dispatch({ type: TOPIC_SUCCESS, payload: data }))
    .catch(err => {
      dispatch({
        type: TOPIC_FAILURE,
        payload: err.message,
      });
    });
};

const clearTopicData = () => dispatch => dispatch({ type: TOPIC_CLEAR });

export default {
  TOPIC_REQUEST,
  TOPIC_SUCCESS,
  TOPIC_FAILURE,
  TOPIC_CLEAR,
  fetchTopicData,
  clearTopicData,
};
