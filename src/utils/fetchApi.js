import axios from "axios";
import { server } from "../server";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${server}/api/v1/${url}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
// get tanpa authorization
export const getDataAPINT = async (url) => {
  const res = await axios.get(`${server}/api/v1/${url}`, {
    withCredentials: true,
  });
  return res;
};


export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${server}/api/v1/${url}`, post, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`${server}/api/v1/${url}`, post, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`${server}/api/v1/${url}`, post, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`${server}/api/v1/${url}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// Auth Api
export const AuthApi = async (url, post) => {
  const res = await axios.post(`${server}/auth/${url}`, post, {
    withCredentials: true,
  });
  return res;
};

export const refreshApi = async () => {
  const res = await axios.get(`${server}/auth/refresh-token`, {
    withCredentials: true,
  });
  return res;
};
export const logoutApi = async () => {
  const res = await axios.get(`${server}/auth/logout`, {
    withCredentials: true,
  });
  return res;
};

// untuk unggah gambar multipart

export const postMultiPartDataAPI = async (url, post, token) => {

  const res = await axios.post(`${server}/api/v1/${url}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
export const putMultiPartDataAPI = async (url, post, token) => {
  const res = await axios.put(`${server}/api/v1/${url}`, post, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
