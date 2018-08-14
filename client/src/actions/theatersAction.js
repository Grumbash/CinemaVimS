import axios from "axios";

import { GET_THEATERS, THEATERS_LOADING, THEATERS_NOT_FOUND } from "./types";

// Get theaters

export const getTheaters = () => dispatch => {
  dispatch(setTheatesLoading());
  axios
    .get("/api/theaters")
    .then(res => dispatch({ type: GET_THEATERS, payload: res.data }))
    .catch(err => dispatch({ type: THEATERS_NOT_FOUND, payload: {} }));
};

// Profile loading
export const setTheatesLoading = () => {
  return { type: THEATERS_LOADING };
};
