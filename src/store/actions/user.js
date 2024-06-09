import axios from "axios";
import { loadUserRequest, loadUserSuccess, loadUserFail } from "../slice/user";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get("http://localhost:4000/users");
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response));
  }
};
