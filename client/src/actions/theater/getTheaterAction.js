import { GET_THEATER, THEATER_LOADING, THEATER_NOT_FOUND } from "../types";
import axios from "axios";

function getTheater(payload) {
  return { type: GET_THEATER, payload, loading: false };
}

function errorTheater(err) {
  return { type: THEATER_NOT_FOUND, err, loading: false };
}

function loading() {
  return { type: THEATER_LOADING, loading: true };
}

export default path => dispatch => {
  dispatch(loading());
  axios
    .get(path)
    .then(res => dispatch(getTheater(res.data)))
    .catch(err => errorTheater(err));
};
