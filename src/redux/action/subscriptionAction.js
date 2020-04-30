import {
  ADD_USER_SUBSCRIPTION,
  GET_ALL_USER_SUBSCRIPTIONS,
  DELETE_USER_SUBSCRIPTION,
  EDIT_USER_SUBSCRIPTION
  // EDIT_USER_SUBSCRIPTION
} from "../actionTypes/actionTypes";
import Axios from "../../lib/Axios/Axios";

export const addUserSubscription = (subInfo) => async (dispatch) => {
  try {
    let subscription = await Axios.post(
      "/subscription/create-subscription",
      subInfo
    );
    let appointment = await Axios.post('/twilio/create-appointment', subscription.data)
    
    dispatch({
      type: ADD_USER_SUBSCRIPTION,
      payload: subscription.data,
    });
    // console.log(`SUBSCRIPTION ACTION LINE 17`, success);
    Promise.resolve({
      subscription: subscription.data,
      appointment: appointment.data
    });
  } catch (error) {
    console.log((`here it is:`, error));
    return Promise.reject(error);
  }
};

export const getAllUserSubscriptions = (id) => async (dispatch) => {
  try {
    let foundAllUserSubs = await Axios.get(
      `/subscription/get-all-user-subscriptions/${id}`
    );
    dispatch({
      type: GET_ALL_USER_SUBSCRIPTIONS,
      payload: foundAllUserSubs.data,
    });
    Promise.resolve(foundAllUserSubs.data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubscriptionById = (subInfo) => async (dispatch) => {
  try {
    let deletedSubId = await Axios.delete(`/subscription/delete-by-id/${subInfo.subID}`, { data: subInfo });

    dispatch({
      type: DELETE_USER_SUBSCRIPTION,
      payload: deletedSubId.data.deletedSub
    });
  } catch (error) {
    console.log(error);
  }
}

export const editSubscriptionById = (info) => async (dispatch) => {
  try {
    let editSub = await Axios.put(`/subscription/edit-user-sub/${info.subID}`, info);
    console.log(editSub)

    dispatch({
      type: EDIT_USER_SUBSCRIPTION,
      payload: editSub.data
    })
  } catch (error) {
    console.log(error);
  }
}




