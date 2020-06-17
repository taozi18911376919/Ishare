import Config from '@Config';
import NetWork from '@Utils/network';

const prefix = 'ACCOUNT';

const ACCOUNT_REQUEST = `${prefix}_REQUEST`;
const ACCOUNT_FAILURE = `${prefix}_FAILURE`;
const ACCOUNT_USERINFO_SUCCESS = `${prefix}_USERINFO_SUCCESS`;
const ACCOUNT_TOPIC_SUCCESS = `${prefix}_TOPIC_SUCCESS`;
const ACCOUNT_NOTIFICATION_SUCCESS = `${prefix}_NOTIFICATION_SUCCESS`;
const ACCOUNT_CONTRIBUTE_SUCCESS = `${prefix}_CONTRIBUTE_SUCCESS`;
const ACCOUNT_FAVORITE_SUCCESS = `${prefix}_FAVORITE_SUCCESS`;
const ACCOUNT_TOPIC_CLEAR = `${prefix}_TOPIC_CLEAR`;
const ACCOUNT_NOTIFICATION_CLEAR = `${prefix}_NOTIFICATION_CLEAR`;
const ACCOUNT_CONTRIBUTE_CLEAR = `${prefix}_CONTRIBUTE_CLEAR`;
const ACCOUNT_FAVORITE_CLEAR = `${prefix}_FAVORITE_CLEAR`;

const fetchUserData = (query, header) => dispatch => NetWork.post(`${Config.apiBaseUrl}/api/v1/user/center`,
  { ...query },
  { headers: { ...header } })
  .then(data => dispatch({ type: ACCOUNT_USERINFO_SUCCESS, payload: data }));

const fetchData = (query, header) => dispatch => {
  dispatch({ type: ACCOUNT_REQUEST });
  return NetWork.post(`${Config.apiBaseUrl}/api/v1/user/center`,
    { ...query },
    { headers: { ...header } })
    .then(data => {
      switch (query.type) {
        case 'CONTRIBUTE':
          dispatch({ type: ACCOUNT_CONTRIBUTE_SUCCESS, payload: data });
          break;
        case 'FAVORITE':
          dispatch({ type: ACCOUNT_FAVORITE_SUCCESS, payload: data });
          break;
        case 'NOTIFICATION':
          dispatch({ type: ACCOUNT_NOTIFICATION_SUCCESS, payload: data });
          break;
        default:
          dispatch({ type: ACCOUNT_TOPIC_SUCCESS, payload: data });
          break;
      }
    })
    .catch(err => dispatch({
      type: ACCOUNT_FAILURE,
      payload: err.message,
    }));
};

const clearData = type => dispatch => {
  switch (type) {
    case 'CONTRIBUTE':
      dispatch({ type: ACCOUNT_CONTRIBUTE_CLEAR });
      break;
    case 'FAVORITE':
      dispatch({ type: ACCOUNT_FAVORITE_CLEAR });
      break;
    case 'NOTIFICATION':
      dispatch({ type: ACCOUNT_NOTIFICATION_CLEAR });
      break;
    default:
      dispatch({ type: ACCOUNT_TOPIC_CLEAR });
      break;
  }
};

export default {
  ACCOUNT_USERINFO_SUCCESS,
  ACCOUNT_REQUEST,
  ACCOUNT_FAILURE,
  ACCOUNT_TOPIC_SUCCESS,
  ACCOUNT_NOTIFICATION_SUCCESS,
  ACCOUNT_CONTRIBUTE_SUCCESS,
  ACCOUNT_FAVORITE_SUCCESS,
  ACCOUNT_TOPIC_CLEAR,
  ACCOUNT_NOTIFICATION_CLEAR,
  ACCOUNT_CONTRIBUTE_CLEAR,
  ACCOUNT_FAVORITE_CLEAR,
  fetchUserData,
  fetchData,
  clearData,
};
