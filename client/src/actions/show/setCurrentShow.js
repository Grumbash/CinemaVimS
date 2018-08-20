import { SET_CURRENT_SHOW } from "../types";

export default function(showId) {
  return { type: SET_CURRENT_SHOW, show: showId };
}
