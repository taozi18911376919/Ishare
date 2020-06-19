const prefix = 'UI';

const UI_SHOW = `${prefix}_SHOW`;
const UI_COLSE = `${prefix}_CLOSE`;

const showModal = type => dispatch => {
  dispatch({
    type: UI_SHOW,
    payload: type,
  });
};

const closeModal = () => dispatch => dispatch({ type: UI_COLSE });

export default {
  UI_SHOW,
  UI_COLSE,
  showModal,
  closeModal,
};
