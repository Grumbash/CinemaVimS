import axios from "axios";

export default (GET, LOADING, NOT_FOUND, path) => dispatch => {
  // Profile loading
  const setLoading = () => {
    return { type: LOADING };
  };

  dispatch(setLoading());
  axios
    .get(path)
    .then(res => dispatch({ type: GET, payload: res.data }))
    .catch(err => dispatch({ type: NOT_FOUND, payload: {} }));
};
