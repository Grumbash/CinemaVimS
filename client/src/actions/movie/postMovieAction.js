import { POST_MOVIE, MOVIE_NOT_FOUND } from "../types";
import getMovies from "../movies/getMoviesAction";
import axios from "axios";

function postMovie(payload) {
  return { type: POST_MOVIE, payload };
}

function errorMovies(err) {
  return { type: MOVIE_NOT_FOUND, err };
}

export default path => payload => dispatch => {
  console.log(path, payload);
  axios
    .post(path, payload)
    .then(res => {
      dispatch(postMovie(res.data));
      getMovies(path)(dispatch);
    })
    .catch(err => errorMovies(err));
};
