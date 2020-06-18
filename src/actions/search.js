import Config from '@Config';
import NetWork from '@Utils/network';

const prefix = 'SEARCH';

const SEARCH_REQUEST = `${prefix}_REQUEST`;
const SEARCH_FAILURE = `${prefix}_FAILURE`;
const SEARCH_SET_DATA = `${prefix}_SET_DATA`;
const SEARCH_CONTRIBUTE_SUCCESS = `${prefix}_CONTRIBUTE_SUCCESS`;
const SEARCH_TOPIC_SUCCESS = `${prefix}_TOPIC_SUCCESS`;
const SEARCH_CONTRIBUTE_CLEAR = `${prefix}_CONTRIBUTE_CLEAR`;
const SEARCH_TOPIC_CLEAR = `${prefix}_TOPIC_CLEAR`;

const setSearchData = data => dispatch => {
  dispatch({ type: SEARCH_SET_DATA, payload: data });
};

const fetchData = (query, header) => dispatch => {
  dispatch({ type: SEARCH_REQUEST });
  return NetWork.post(`${Config.apiBaseUrl}/api/v1/search/index`,
    { ...query },
    { headers: { ...header } })
    .then(data => {
      switch (query.search_type) {
        case 'TOPIC':
          dispatch({ type: SEARCH_TOPIC_SUCCESS, payload: data });
          break;
        default:
          dispatch({ type: SEARCH_CONTRIBUTE_SUCCESS, payload: data });
          break;
      }
    })
    .catch(err => dispatch({
      type: SEARCH_FAILURE,
      payload: err.message,
    }));
};

const clearData = type => dispatch => {
  switch (type) {
    case 'TOPIC':
      dispatch({ type: SEARCH_TOPIC_CLEAR });
      break;
    default:
      dispatch({ type: SEARCH_CONTRIBUTE_CLEAR });
      break;
  }
};

export default {
  SEARCH_REQUEST,
  SEARCH_FAILURE,
  SEARCH_TOPIC_SUCCESS,
  SEARCH_CONTRIBUTE_SUCCESS,
  SEARCH_TOPIC_CLEAR,
  SEARCH_CONTRIBUTE_CLEAR,
  SEARCH_SET_DATA,
  setSearchData,
  fetchData,
  clearData,
};
