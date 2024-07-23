import { toast } from "react-toastify";
import { getDataAPI, putDataAPI } from "../../utils/fetchApi";
import { setLoadCart, setUpdateCart } from "../slice/cart";

// model reqbody array object
//  "items":[
//         {
//             "qty":1,
//             "color":"pink",
//             "size":"l",
//             "product":"666d5ad30f61e29464908495"
//         },
//     ]
export const updateCart = (items, justUpdate) => async (dispatch, getState) => {
  const state = getState();

  dispatch(setLoadCart(true));
  try {
    const res = await putDataAPI("cart", { items }, state.auth.token);
    dispatch(setUpdateCart(res.data.cartItems));
    localStorage.setItem("cartItems", JSON.stringify(res.data.cartItems));
    if (justUpdate) {
      toast.success("update cart success");
    } else {
      toast.success("add to cart success");
    }
  } catch (error) {
    console.log(error);
    if(justUpdate){
        toast.error("update cart fail");
    }else{
        toast.error("add to cart fail");
    }
  } finally {
    setLoadCart(false);
  }
};

//Get Cart
export const getCArt = () => async (dispatch, getState) => {
  const state = getState();

  try {
    const res = await getDataAPI("cart", state.auth.token);
    console.log(res.data);
    dispatch(setUpdateCart(res.data.cartItems));
    localStorage.setItem("cartItems", JSON.stringify(res.data.cartItems));
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
