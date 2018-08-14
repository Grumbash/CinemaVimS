import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import theatersReducer from "./theatersReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  theaters: theatersReducer
});
