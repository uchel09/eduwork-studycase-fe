import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:{},
  users:[]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
});

export const {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  setAuthenticated,
  clearErrors,
} = userSlice.actions;
export default userSlice.reducer;
