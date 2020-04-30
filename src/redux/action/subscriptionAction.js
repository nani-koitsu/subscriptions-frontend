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
<<<<<<< HEAD
    let success = await Axios.post(
      "/api/subscription/create-subscription",
=======
    let subscription = await Axios.post(
      "/subscription/create-subscription",
>>>>>>> 07dcbbf247438b8859aa7ad61b418701bed0b35d
      subInfo
    );
    let appointment = await Axios.post('/twilio/create-appointment', subscription.data)
    console.log(appointment)
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
      `/api/subscription/get-all-user-subscriptions/${id}`
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
<<<<<<< HEAD

    let deletedSubId = await Axios.delete(`/api/subscription/delete-by-id/${id}`);

    console.log(deletedSubId, 'line 46 action');

=======
    let deletedSubId = await Axios.delete(`/subscription/delete-by-id/${subInfo.subID}`, {data: subInfo});
  
>>>>>>> 07dcbbf247438b8859aa7ad61b418701bed0b35d
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
    let editSub = await Axios.put(`/api/subscription/edit-user-sub/${info.subID}`, info);
    console.log(editSub)

    dispatch({
      type: EDIT_USER_SUBSCRIPTION,
      payload: editSub.data
    })
  } catch (error) {
    console.log(error);
  }
}




