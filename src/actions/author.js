import Config from '@Config';
import NetWork from '@Utils/network';

const prefix = 'AUTHOR';

const AUTHOR_REQUEST = `${prefix}_REQUEST`;
const AUTHOR_SUCCESS = `${prefix}_SUCCESS`;
const AUTHOR_FAILURE = `${prefix}_FAILURE`;
const AUTHOR_CLEAR = `${prefix}_CLEAR`;

const fetchAuthorData = query => dispatch => {
  dispatch({ type: AUTHOR_REQUEST });
  return NetWork.post(`${Config.apiBaseUrl}/author/index`, { ...query })
    .then(data => dispatch({ type: AUTHOR_SUCCESS, payload: data }))
    .catch(err => {
      dispatch({
        type: AUTHOR_FAILURE,
        payload: err.message,
      });
    });
};

const clearAuthorData = () => dispatch => dispatch({ type: AUTHOR_CLEAR });

export default {
  AUTHOR_REQUEST,
  AUTHOR_SUCCESS,
  AUTHOR_FAILURE,
  AUTHOR_CLEAR,
  fetchAuthorData,
  clearAuthorData,
};
