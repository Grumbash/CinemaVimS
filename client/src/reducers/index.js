import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import theatersReducer from "./theatersReducer";
import moviesReducer from "./moviesReducer";
import movieReducer from "./movieReducer";
import showsReducer from "./showsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  theaters: theatersReducer,
  movies: moviesReducer,
  movie: movieReducer,
  shows: showsReducer
});
