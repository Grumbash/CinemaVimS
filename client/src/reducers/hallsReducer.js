import { GET_HALLS, HALLS_LOADING } from "../actions/types";
const initialState = {
  loading: false,
  payload: [
    {
      shows: [],
      _id: "",
      No: "",
      theaterId: ""
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HALLS_LOADING:
      return { ...state, loading: true };
    case GET_HALLS:
      return { ...state, payload: action.payload, loading: false };
    default:
      return state;
  }
}
