import { GET_THEATERS, THEATERS_LOADING, THEATERS_NOT_FOUND } from "./types";
import getData from "./getDataActionCreater";

// Get theaters
export default getData(
  {
    GET: GET_THEATERS,
    LOADING: THEATERS_LOADING,
    NOT_FOUND: THEATERS_NOT_FOUND
  },
  "/api/theaters"
);
