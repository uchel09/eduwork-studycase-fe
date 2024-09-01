import { toast } from "react-toastify";

import { getDataAPINT, postMultiPartDataAPI } from "../../utils/fetchApi";
import {
  setAddProduct,
  setGetProductById,
  setGetProducts,
  setLoadingProducts,
  setTotalPages,
} from "../slice/productSlice";
import axios from "axios";

export const createProduct =
  ({ formData, token }) =>
  async (dispatch) => {
    try {
      const res = await postMultiPartDataAPI("products", formData, token);

      dispatch(setAddProduct(res.data.product));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

export const getProducts =
  ({ tags = "", category = "", page = 0, limit = 5, query = "" }) =>
  async (dispatch) => {
    try {
      dispatch(setLoadingProducts(true));
      const { data } = await getDataAPINT(
        `products?skip=${page}&limit=${limit}&q=${query}&category[]=${category}&tags[]=${tags}`
      );
      dispatch(setGetProducts(data.products));

      dispatch(setTotalPages(data.totalPages));
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoadingProducts(false));
    }
  };

export const getProductsTest =
  ({ tags = [], category = [], skip = 0, limit = 1, q = "" }) =>
  async (dispatch) => {
    const params = new URLSearchParams();

    if (q) params.append("q", q);
    if (skip) params.append("skip", skip * limit);
    if (limit) params.append("limit", limit);
    if (category.length)
      category.forEach((cat) => params.append("category[]", cat));
    if (tags.length) tags.forEach((tag) => params.append("tags[]", tag));

    const queryString = params.toString();
    console.log(queryString);

    dispatch(setLoadingProducts(true));
    try {
      const { data } = await getDataAPINT(`products?${queryString}`);

      dispatch(setGetProducts(data.products));
      dispatch(setTotalPages(data.totalPages));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      dispatch(setLoadingProducts(false));
    }
  };

export const getProductById = (id) => async (dispatch) => {
  try {
    const { data } = await getDataAPINT(`products/${id}`);
    console.log(data);
    dispatch(setGetProductById(data.product));
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
