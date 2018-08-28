import { GET_SHOWS, SHOWS_LOADING } from "../actions/types";
const initialState = {
  loading: false,
  payload: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOWS_LOADING:
      return { ...state, loading: true };
    case GET_SHOWS:
      return { ...state, payload: action.payload, loading: false };
    default:
      return state;
  }
}
