import {
  IS_MODAL_OPEN,
  OPEN_DELETE_MODAL,
  CLOSE_DELETE_MODAL
} from "../actions/types";

const initialState = {
  isOpen: false,
  isDeleteOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IS_MODAL_OPEN:
      return { ...state, isOpen: action.isOpen };
    case OPEN_DELETE_MODAL:
      return { ...state, isDeleteOpen: true };
    case CLOSE_DELETE_MODAL:
      return { ...state, isDeleteOpen: false };
    default:
      return state;
  }
}
