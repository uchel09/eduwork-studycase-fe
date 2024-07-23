import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user";
import cartReducer from "./slice/cart";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import componentReducer from "./slice/component";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,
    component: componentReducer,
  },
});

export default store;
