import { GET_MOVIE, MOVIE_LOADING, MOVIE_NOT_FOUND } from "../types";
import axios from "axios";

function getMovie(payload) {
  return {
    type: GET_MOVIE,
    payload,
    loading: false
  };
}

function errorMovie(err) {
  return {
    type: MOVIE_NOT_FOUND,
    err,
    loading: false
  };
}
function loading() {
  return {
    type: MOVIE_LOADING,
    loading: true
  };
}

export default path => dispatch => {
  dispatch(loading());
  axios
    .get(path)
    .then(res => dispatch(getMovie(res.data)))
    .catch(err => errorMovie(err));
};
