import { POST_HALL, HALL_NOT_FOUND } from "../types";
import getTheaters from "../theaters/getTheatersAction";
import axios from "axios";

function postHall(payload) {
  return { type: POST_HALL, payload };
}

function errorHall(err) {
  return { type: HALL_NOT_FOUND, err };
}

export default path => payload => dispatch => {
  axios
    .post(path, payload)
    .then(res => {
      dispatch(postHall(res.data));
      getTheaters(path)(dispatch);
    })
    .catch(err => errorHall(err));
};
