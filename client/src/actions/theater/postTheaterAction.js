import { POST_THEATER, THEATERS_LOADING, THEATERS_NOT_FOUND } from "../types";
import axios from "axios";

function postTheaters(payload) {
  return { type: POST_THEATER, payload, loading: false };
}

function errorTheaters(err) {
  return { type: THEATERS_NOT_FOUND, err, loading: false };
}

function loading() {
  return { type: THEATERS_LOADING };
}

export default path => payload => dispatch => {
  dispatch(loading());
  axios
    .post(path, payload)
    .then(res => dispatch(postTheaters(res.data)))
    .catch(err => errorTheaters(err));
};
