import {
  ADD_USER_SUBSCRIPTION,
  GET_ALL_USER_SUBSCRIPTIONS,
  DELETE_USER_SUBSCRIPTION,
  EDIT_USER_SUBSCRIPTION
} from "../actionTypes/actionTypes";

const initialState = {
  userSubscriptions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_USER_SUBSCRIPTION:
      let newSubscriptionsArr = [...state.userSubscriptions, action.payload];
      return {
        ...state,
        userSubscriptions: newSubscriptionsArr,
      };

    case GET_ALL_USER_SUBSCRIPTIONS:
      return {
        ...state,
        userSubscriptions: [...action.payload],
      };

    case DELETE_USER_SUBSCRIPTION:
      let updatedSubList = state.userSubscriptions.filter(item => item._id !== action.payload._id)
      
      return {
        ...state,
        userSubscriptions: updatedSubList
      };

    case EDIT_USER_SUBSCRIPTION:
      let editUserSub = state.userSubscriptions.map(item => {
        if(item._id === action.payload._id) {
          item = action.payload
        }
        return item
      })
      return {
        ...state,
        userSubscriptions: editUserSub
      };

    default:
      return state;
  }
}
