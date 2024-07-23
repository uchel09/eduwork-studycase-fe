import { createSlice } from "@reduxjs/toolkit";

const componentSlice = createSlice({
  name: "component",
  initialState: {
    openSidebar: false,
    categories: [],
    tags: [],
    skip: 0,
    q: "",
  },
  reducers: {
    setOpenSidebar: (state, action) => {
      state.openSidebar = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setSkip: (state, action) => {
      state.skip = action.payload;
    },
    setQ: (state, action) => {
      state.q = action.payload;
    },
  },
});

export const { setOpenSidebar, setCategories, setQ, setSkip, setTags } =
  componentSlice.actions;
export default componentSlice.reducer;
