import { GET_THEATERS, THEATERS_LOADING, THEATERS_NOT_FOUND } from "../types";
import axios from "axios";

function getTheaters(payload) {
  return { type: GET_THEATERS, payload, loading: false };
}

function errorTheaters(err) {
  return { type: THEATERS_NOT_FOUND, err, loading: false };
}

function loading() {
  return { type: THEATERS_LOADING, loading: true };
}

export default path => dispatch => {
  dispatch(loading());
  axios
    .get(path)
    .then(res => dispatch(getTheaters(res.data)))
    .catch(err => errorTheaters(err));
};
