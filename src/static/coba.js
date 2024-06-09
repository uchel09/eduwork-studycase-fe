// mySlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    LoadUserRequest: (state) => {
      state.status = "loading";
    },
    fetchDataSuccess: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  mySlice.actions;

export const fetchData = () => async (dispatch) => {
  dispatch(fetchDataStart());

  try {
    const response = await axios.get("URL_API");
    dispatch(fetchDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export default mySlice.reducer;
