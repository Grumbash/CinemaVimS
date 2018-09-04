import { POST_SHOW, SHOW_NOT_FOUND } from "../types";
import getShowsAction from "../shows/getShowsAction";
import axios from "axios";

function postShow(payload) {
  return { type: POST_SHOW, payload };
}

function errorShow(err) {
  return { type: SHOW_NOT_FOUND, err };
}

export default path => payload => dispatch => {
  console.log(path, payload);
  axios
    .post(path, payload)
    .then(res => {
      dispatch(postShow(res.data));
      getShowsAction(path)(dispatch);
    })
    .catch(err => errorShow(err));
};
