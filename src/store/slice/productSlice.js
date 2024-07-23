import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {},
    loadingProducts: false,
    tags: [],
    categories: [],
    totalPages:0
  },
  reducers: {
    setAddProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setGetProducts: (state, action) => {
      state.products = action.payload;
    },
    setGetProductById: (state, action) => {
      state.product = action.payload;
    },
    setLoadingProducts: (state, action) => {
      state.loadingProducts = action.payload;
    },
  },
});

export const {
  setAddProduct,
  setGetProducts,
  setGetProductById,
  setLoadingProducts,
  setTotalPages
} = productSlice.actions;
export default productSlice.reducer;
