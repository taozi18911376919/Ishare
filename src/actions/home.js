import Config from '@Config';
import NetWork from '@Utils/network';

const prefix = 'HOME';

const HOME_REQUEST = `${prefix}_REQUEST`;
const HOME_SUCCESS = `${prefix}_SUCCESS`;
const HOME_FAILURE = `${prefix}_FAILURE`;

const fetchHomeData = categoryId => dispatch => {
  dispatch({ type: HOME_REQUEST });
  return NetWork.post(`${Config.apiBaseUrl}/api/v1/home/index`, { category_id: categoryId })
    .then(data => dispatch({ type: HOME_SUCCESS, payload: data }))
    .catch(err => {
      dispatch({
        type: HOME_FAILURE,
        payload: err.message,
      });
    });
};

export default {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAILURE,
  fetchHomeData,
};
