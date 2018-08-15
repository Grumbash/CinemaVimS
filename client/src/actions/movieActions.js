import getData from "./getDataActionCreater";

// Get movie
export function getMovie(methods, path, dispatch) {
  getData(methods, path)()(dispatch);
}
