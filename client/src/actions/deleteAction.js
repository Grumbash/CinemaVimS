import axios from "axios";
import { DELETING_IS_SUCCESS } from "./types";

export default (path, target, push, pushPath) => {
  axios.delete(path).then(res => {
    console.log(push);
    push(pushPath);
  });
  return { type: DELETING_IS_SUCCESS, payload: target };
};
