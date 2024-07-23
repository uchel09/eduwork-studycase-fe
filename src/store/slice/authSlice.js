import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "cart",
  initialState: {
    token: "",
    user: null,
    authLoad: false,
    addresses: [],

  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthLoad: (state, action) => {
      state.authLoad = action.payload;
    },
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
  },
});

export const { setToken, setUser, setAuthLoad, setAddresses } =
  authSlice.actions;
export default authSlice.reducer;
