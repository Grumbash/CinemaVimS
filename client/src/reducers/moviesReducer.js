import { GET_MOVIES, MOVIES_LOADING } from "../actions/types";
const initialState = {
  loading: false,
  films: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MOVIES_LOADING:
      return { ...state, loading: true };
    case GET_MOVIES:
      return { ...state, films: action.payload, loading: false };
    default:
      return state;
  }
}
