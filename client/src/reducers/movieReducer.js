import { GET_MOVIE, MOVIE_LOADING } from "../actions/types";
const initialState = {
  loading: false,
  payload: {
    shows: [],
    _id: "",
    title: "",
    duration: null
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MOVIE_LOADING:
      return { ...state, loading: true };
    case GET_MOVIE:
      return { ...state, payload: action.payload, loading: false };
    default:
      return state;
  }
}
