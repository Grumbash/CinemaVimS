import {
  GET_SHOW,
  SHOW_LOADING,
  SET_CURRENT_SHOW,
  POST_SHOW
} from "../actions/types";
const initialState = {
  loading: false,
  rows: [],
  currentShow: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return { ...state, loading: true };
    case GET_SHOW:
      return { ...state, rows: action.payload, loading: false };
    case SET_CURRENT_SHOW:
      return { ...state, currentShow: action.show };
    case POST_SHOW:
      return { ...state, rows: action.payload, loading: false };
    default:
      return state;
  }
}
