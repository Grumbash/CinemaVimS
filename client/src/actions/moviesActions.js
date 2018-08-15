import { GET_MOVIES, MOVIES_LOADING, MOVIES_NOT_FOUND } from "./types";
import getData from "./getDataActionCreater";

// Get movies
export default getData(
  {
    GET: GET_MOVIES,
    LOADING: MOVIES_LOADING,
    NOT_FOUND: MOVIES_NOT_FOUND
  },
  "/api/movies"
);
