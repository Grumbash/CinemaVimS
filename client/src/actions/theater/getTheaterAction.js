import { GET_THEATER, THEATER_LOADING, THEATER_NOT_FOUND } from "../types";
import axios from "axios";

function getTheater(payload) {
  return { type: GET_THEATER, payload };
}

function errorTheater(err) {
  return { type: THEATER_NOT_FOUND, err };
}

function loading() {
  return { type: THEATER_LOADING };
}

export default path => dispatch => {
  dispatch(loading());
  axios
    .get(path)
    .then(res => dispatch(getTheater(res.data)))
    .catch(err => errorTheater(err));
};
