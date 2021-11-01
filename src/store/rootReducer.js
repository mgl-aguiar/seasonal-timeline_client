import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import produce from "./produce/reducer";

export default combineReducers({
  appState,
  user,
  produce,
});
