import { combineReducers } from "redux";
import authUserReducer from "./authUserReducer";
import subscriptionReducer from "./subscriptionReducer";

export default combineReducers({
  authUser: authUserReducer,
  userSubscriptions: subscriptionReducer
});
