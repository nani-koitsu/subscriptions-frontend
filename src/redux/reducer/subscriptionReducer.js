import {
  ADD_USER_SUBSCRIPTION,
  GET_ALL_USER_SUBSCRIPTIONS
} from "../actionTypes/actionTypes";

const initialState = {
  subscriptions: [],
  userSubscriptions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_SUBSCRIPTION:
      let newSubscriptionsArr = [...state.subscriptions, action.payload];
      return {
        ...state,
        subscriptions: newSubscriptionsArr
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
