import { GET_MOVIES, MOVIES_LOADING, MOVIES_NOT_FOUND } from "../types";
import axios from "axios";

function getMovies(payload) {
  return {
    type: GET_MOVIES,
    payload,
    loading: false
  };
}

function errorMovies(err) {
  return {
    type: MOVIES_NOT_FOUND,
    err,
    loading: false
  };
}
function loading() {
  return {
    type: MOVIES_LOADING,
    loading: true
  };
}

export default path => dispatch => {
  dispatch(loading());
  axios
    .get(path)
    .then(res => dispatch(getMovies(res.data)))
    .catch(err => errorMovies(err));
};
