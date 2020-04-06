import { CLOUDINARY_FETCH_ALL_IMAGES } from "../actionTypes/actionTypes";

const initialState = {
  cloudinaryList: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLOUDINARY_FETCH_ALL_IMAGES:
      return {
        ...state,
        cloudinaryList: { ...action.payload },
      };
    default:
      return state;
  }
}
