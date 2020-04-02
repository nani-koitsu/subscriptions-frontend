import { CLOUDINARY_FETCH_ALL_IMAGES } from "../actionTypes/actionTypes";
import Axios from "../../lib/Axios/Axios";

export const getAllCloudinaryImages = () => async dispatch => {
  try {
    let success = await Axios.get("/cloudinary");
    dispatch({
      type: CLOUDINARY_FETCH_ALL_IMAGES,
      payload: success.data
    });
    Promise.resolve(success.data);
  } catch (error) {
    console.log(error);
    Promise.resolve(error);
  }
};
