import { GET_SHOW, SHOW_LOADING } from "../actions/types";
const initialState = {
  loading: false,
  rows: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return { ...state, loading: true };
    case GET_SHOW:
      return { ...state, rows: action.payload, loading: false };
    default:
      return state;
  }
}
