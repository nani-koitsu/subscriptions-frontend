import {
  ADD_USER_SUBSCRIPTION,
  GET_ALL_USER_SUBSCRIPTIONS
} from "../actionTypes/actionTypes";

const initialState = {
  userSubscriptions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_SUBSCRIPTION:
      // console.log(action.payload);
      let newSubscriptionsArr = [...state.userSubscriptions, action.payload];
      return {
        ...state,
        userSubscriptions: newSubscriptionsArr
      };
    case GET_ALL_USER_SUBSCRIPTIONS:
      return {
        ...state,
        userSubscriptions: [...action.payload]
      };
    default:
      return state;
  }
}
