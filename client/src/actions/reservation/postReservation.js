import { TICKET_IS_POSTING, REVSERVATION_NOT_FOUNDED } from "../types";
import axios from "axios";

function postReservation(payload) {
  return { type: TICKET_IS_POSTING, payload };
}

function errorReservation(err) {
  return { type: REVSERVATION_NOT_FOUNDED, err };
}

export default path => payload => dispatch => {
  console.log(payload);
  axios
    .post(path, payload)
    .then(res => {
      console.log(res.data);
      dispatch(postReservation(res.data));
    })
    .catch(err => errorReservation(err));
};
