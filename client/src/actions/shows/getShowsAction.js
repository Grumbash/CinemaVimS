import { GET_SHOWS, SHOWS_LOADING, SHOWS_NOT_FOUND } from "../types";
import axios from "axios";

function getShows(payload) {
  return { type: GET_SHOWS, payload, loading: false };
}

function errorShows(err) {
  return { type: SHOWS_NOT_FOUND, err, loading: false };
}
function loading() {
  return { type: SHOWS_LOADING, loading: true };
}

export default path => dispatch => {
  dispatch(loading());
  axios
    .get(path)
    .then(res => dispatch(getShows(res.data)))
    .catch(err => errorShows(err));
};
