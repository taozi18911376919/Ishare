import Config from '@Config';
import NetWork from '@Utils/network';

const prefix = 'TOPIC';

const TOPIC_REQUEST = `${prefix}_REQUEST`;
const TOPIC_SUCCESS = `${prefix}_SUCCESS`;
const TOPIC_FAILURE = `${prefix}_FAILURE`;
const TOPIC_CLEAR = `${prefix}_CLEAR`;
const TOPIC_FAVORITE = `${prefix}_FAVORITE`;

const fetchTopicData = (query, header) => dispatch => {
  dispatch({ type: TOPIC_REQUEST });
  return NetWork.post(`${Config.apiBaseUrl}/api/v1/topic/index`, { ...query }, { headers: { ...header } })
    .then(data => dispatch({ type: TOPIC_SUCCESS, payload: data }))
    .catch(err => {
      dispatch({
        type: TOPIC_FAILURE,
        payload: err.message,
      });
    });
};

const clearTopicData = () => dispatch => dispatch({ type: TOPIC_CLEAR });


const favorate = parmas => dispatch => {
  const url = `${Config.apiBaseUrl}/api/v1/topic/${parmas.type ? 'favorite' : 'cancel-favorite'}`;
  return NetWork.post(url, { ...parmas })
    .then(() => {
      console.log(parmas.type);
      dispatch({
        type: TOPIC_FAVORITE,
        payload: {
          favorite_status: parmas.type,
        },
      });
    });
};


export default {
  TOPIC_REQUEST,
  TOPIC_SUCCESS,
  TOPIC_FAILURE,
  TOPIC_CLEAR,
  TOPIC_FAVORITE,
  fetchTopicData,
  clearTopicData,
  favorate,
};
