import { GET_HALLS, HALLS_NOT_FOUND, HALLS_LOADING } from "../types";
import axios from "axios";

function getHalls(payload) {
  return { type: GET_HALLS, payload };
}

function errorHalls(err) {
  return { type: HALLS_NOT_FOUND, err };
}

function loading() {
  return { type: HALLS_LOADING };
}

export default path => dispatch => {
  dispatch(loading());
  axios
    .get(path)
    .then(res => dispatch(getHalls(res.data)))
    .catch(err => errorHalls(err));
};
