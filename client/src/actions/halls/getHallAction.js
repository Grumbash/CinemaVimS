import { GET_HALL, HALL_NOT_FOUND, HALL_LOADING } from "../types";
import axios from "axios";

function getHall(payload) {
  return { type: GET_HALL, payload };
}

function errorHall(err) {
  return { type: HALL_NOT_FOUND, err };
}

function loading() {
  return { type: HALL_LOADING };
}

export default path => dispatch => {
  dispatch(loading());
  axios
    .get(path)
    .then(res => dispatch(getHall(res.data)))
    .catch(err => errorHall(err));
};
