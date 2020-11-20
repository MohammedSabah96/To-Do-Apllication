import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import settings from "./settings";
import todo from "./todo";

export default combineReducers({
  auth,
  alert,
  settings,
  todo,
});
