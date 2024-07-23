import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    loadCart: false,
    error: null,
  },
  reducers: {
    setUpdateCart: (state, action) => {
      state.cartItems = action.payload;
    },
    setLoadCart: (state, action) => {
      state.loadCart = action.payload;
    },
  },
});

export const {setUpdateCart,setLoadCart } = cartSlice.actions;
export default cartSlice.reducer;
