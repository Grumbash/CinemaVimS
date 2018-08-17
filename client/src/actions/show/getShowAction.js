import { GET_SHOW, SHOW_LOADING, SHOW_NOT_FOUND } from "../types";
import axios from "axios";

function getShow(payload) {
  return { type: GET_SHOW, payload, loading: false };
}

function errorShow(err) {
  return { type: SHOW_NOT_FOUND, err, loading: false };
}
function loading() {
  return { type: SHOW_LOADING, loading: true };
}

export default path => dispatch => {
  dispatch(loading());
  axios
    .get(path)
    .then(res => dispatch(getShow(res.data)))
    .catch(err => errorShow(err));
};
