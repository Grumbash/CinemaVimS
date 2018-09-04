import {
  GET_HALL,
  HALL_LOADING,
  POST_HALL,
  HALL_NOT_FOUND
} from "../actions/types";
const initialState = {
  loading: false,
  payload: {
    shows: [],
    _id: "",
    No: "",
    theaterId: ""
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HALL_LOADING:
      return { ...state, loading: true };
    case GET_HALL:
      return { ...state, payload: action.payload, loading: false };
    case POST_HALL:
      return { ...state, payload: action.payload, loading: false };
    case HALL_NOT_FOUND:
      return { ...state, payload: action.payload, loading: false };
    default:
      return state;
  }
}
