import {
  ADD_USER_SUBSCRIPTION,
  GET_ALL_USER_SUBSCRIPTIONS
} from "../actionTypes/actionTypes";
import Axios from "../../lib/Axios/Axios";

export const addUserSubscription = subInfo => async dispatch => {
  let subObj = {
    subscriptionName: subInfo.subscriptionName,
    subscriptionType: subInfo.subscriptionType,
    price: subInfo.price,
    startDate: subInfo.subscriptionType,
    submitedBy: subInfo.id
  };
  try {
    let success = await Axios.post("/subscription/create-subscription", subObj);
    dispatch({
      type: ADD_USER_SUBSCRIPTION,
      payload: success.data
    });
    console.log(success);
    Promise.resolve(success.data);
  } catch (error) {
    console.log((`here it is:`, error));
    return Promise.reject(error);
  }
};

export const getAllUserSubscriptions = id => async dispatch => {
  try {
    let foundAllUserSubs = await Axios.get(
      `/subscriptions/get-all-user-subscriptions/${id}`
    );
    dispatch({
      type: GET_ALL_USER_SUBSCRIPTIONS,
      payload: foundAllUserSubs.data
    });
    Promise.resolve(foundAllUserSubs.data);
  } catch (error) {
    console.log(error);
  }
};
