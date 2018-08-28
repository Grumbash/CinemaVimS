import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import theatersReducer from "./theatersReducer";
import theaterReducer from "./theaterReducer";
import moviesReducer from "./moviesReducer";
import movieReducer from "./movieReducer";
import showsReducer from "./showsReducer";
import showReducer from "./showReducer";
import modalsReducer from "./modalsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  theaters: theatersReducer,
  theater: theaterReducer,
  movies: moviesReducer,
  movie: movieReducer,
  shows: showsReducer,
  show: showReducer,
  modals: modalsReducer
});
