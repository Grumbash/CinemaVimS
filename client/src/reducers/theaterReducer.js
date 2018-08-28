import {
  GET_THEATER,
  POST_THEATER,
  THEATER_LOADING,
  SET_CURRENT_THEATER
} from "../actions/types";
const initialState = {
  loading: false,
  currentTheater: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case THEATER_LOADING:
      return { ...state, loading: true };
    case GET_THEATER:
      return { ...state, theater: action.payload, loading: false };
    case SET_CURRENT_THEATER:
      return { ...state, currentTheater: action.theater };
    case POST_THEATER:
      return { ...state, theater: action.payload, loading: false };
    default:
      return state;
  }
}
