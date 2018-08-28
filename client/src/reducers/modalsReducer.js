import { IS_MODAL_OPEN } from "../actions/types";

const initialState = {
  isOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IS_MODAL_OPEN:
      return { ...state, isOpen: action.isOpen };
    default:
      return state;
  }
}
