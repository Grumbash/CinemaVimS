import { POST_THEATER, THEATERS_NOT_FOUND } from "../types";
import getTheaters from "../theaters/getTheatersAction";
import axios from "axios";

function postTheaters(payload) {
  return { type: POST_THEATER, payload };
}

function errorTheaters(err) {
  return { type: THEATERS_NOT_FOUND, err };
}

export default path => payload => dispatch => {
  axios
    .post(path, payload)
    .then(res => {
      dispatch(postTheaters(res.data));
      getTheaters(path)(dispatch);
    })
    .catch(err => errorTheaters(err));
};
