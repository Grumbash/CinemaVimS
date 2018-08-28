import { SET_CURRENT_THEATER } from "../types";

export default function(theaterId) {
  return { type: SET_CURRENT_THEATER, theater: theaterId };
}
