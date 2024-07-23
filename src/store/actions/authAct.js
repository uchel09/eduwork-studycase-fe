import { toast } from "react-toastify";
import {
  AuthApi,
  getDataAPI,
  logoutApi,
  refreshApi,
} from "../../utils/fetchApi";
import {
  setAddresses,
  setAuthLoad,
  setToken,
  setUser,
} from "../slice/authSlice";

export const Login = (loginReq) => async (dispatch) => {
  dispatch(setAuthLoad(true));
  if (!loginReq) {
    dispatch(setAuthLoad(false));
    toast.error("no data of login form");
    return false;
  }
  try {
    const res = await AuthApi("login", loginReq);
    console.log(res.data);
    toast(res.data.message);
    dispatch(setToken(res.data.accessToken));
    dispatch(setUser(res.data.user));
    dispatch(setAuthLoad(false));
    return true;
  } catch (error) {
    dispatch(setAuthLoad(false));
    toast.error(error.response.data.message);
    return false;
  }
};
export const Logout = () => async (dispatch) => {
  dispatch(setAuthLoad(true));

  try {
    const res = await logoutApi();
    console.log(res.data);
    toast.success(res.data.message);
    dispatch(setToken(""));
    dispatch(setUser(null));
    localStorage.clear();
    dispatch(setAuthLoad(false));
    return true;
  } catch (error) {
    dispatch(setAuthLoad(false));
    toast.error(error.response.data.message);
    return false;
  }
};
export const RefreshToken = () => async (dispatch) => {
  const myLogin = localStorage.getItem("myLogin");
  if (myLogin) {
    try {
      const res = await refreshApi();
      toast(res.data.message);
      dispatch(setToken(res.data.accessToken));
      dispatch(setUser(res.data.user));
      return true;
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
      return false;
    }
  }
};

export const Register = (registerReq) => async (dispatch) => {
  dispatch(setAuthLoad(true));
  if (!registerReq) {
    dispatch(setAuthLoad(false));
    toast.error("no data of register form");
    return false;
  }
  try {
    const res = await AuthApi("register", registerReq);
    console.log(res.data);
    toast(res.data.message);
    dispatch(setToken(res.data.accessToken));
    dispatch(setAuthLoad(false));
    return true;
  } catch (error) {
    dispatch(setAuthLoad(false));
    toast.error(error.response.data.message);
    return false;
  }
};

export const getUserAddresses = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("delivery-addresses", token);
    dispatch(setAddresses(res.data.addresses));
  } catch (error) {
    console.log(error);
  }
};
