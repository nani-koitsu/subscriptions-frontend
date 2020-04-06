import { combineReducers } from "redux";
import authUserReducer from "./authUserReducer";
import subscriptionReducer from "./subscriptionReducer";
import cloudinaryReducer from "./cloudinaryReducer";
export default combineReducers({
  authUser: authUserReducer,
  userSubscriptions: subscriptionReducer,
  cloudinaryImages: cloudinaryReducer
});
