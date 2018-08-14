import { GET_THEATERS, THEATERS_LOADING } from "../actions/types";
const initialState = {
  loading: false,
  payload: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case THEATERS_LOADING:
      return { ...state, loading: true };
    case GET_THEATERS:
      return { ...state, payload: action.payload, loading: false };
    default:
      return state;
  }
}
