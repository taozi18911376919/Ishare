import Config from '@Config';
import NetWork from '@Utils/network';

const prefix = 'CATEGORY';

const CATEGORY_REQUEST = `${prefix}_REQUEST`;
const CATEGORY_SUCCESS = `${prefix}_SUCCESS`;
const CATEGORY_FAILURE = `${prefix}_FAILURE`;

const fetchCategory = () => dispatch => {
  try {
    dispatch({ type: CATEGORY_REQUEST });
    NetWork.post(`${Config.apiBaseUrl}/category/all`).then(res => {
      if (res && res.categorys) {
        dispatch({
          type: CATEGORY_SUCCESS,
          payload: res.categorys,
        });
      }
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_FAILURE,
      payload: err.message,
    });
  }
};

export default {
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE,
  fetchCategory,
};
