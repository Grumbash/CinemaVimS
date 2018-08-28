import { IS_MODAL_OPEN } from "../types";

export default function(payload) {
  return {
    type: IS_MODAL_OPEN,
    isOpen: payload
  };
}
