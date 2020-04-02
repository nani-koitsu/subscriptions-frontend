import {
  AUTH_USER_SIGN_IN_SUCCESSFUL,
  AUTH_USER_LOGOUT
} from "../actionTypes/actionTypes";

import setAuthToken from "../../lib/Axios/setAuthToken";
import Axios from "../../lib/Axios/Axios";

export const signup = userInfo => async dispatch => {
  try {
    let success = await Axios.post("/users/signup", userInfo);
    return Promise.resolve(success.data.message);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const signin = userInfo => async dispatch => {
  try {
    let success = await Axios.post("/users/signin", userInfo);

    let { token } = success.data;

    dispatch(setAuthSuccessUser(token));
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

export const userFillInInfo = userInfo => async dispatch => {
  try {
    await Axios.post("/api/users/update-user-info", userInfo);
    await Axios.post("/api/users/submit-survey", userInfo);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

export const setAuthSuccessUser = token => dispatch => {
  localStorage.setItem("jwtToken", token);
  dispatch({
    type: AUTH_USER_SIGN_IN_SUCCESSFUL,
    payload: token
  });
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  window.location.href = "/";
  dispatch({
    type: AUTH_USER_LOGOUT
  });
};

/*

[
  {
    subscriptName:
    aksdkljasdj
    asdkasdjk
  }
]


*/
