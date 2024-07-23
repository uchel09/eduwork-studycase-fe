import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  LoginPage,
  SignUp,
  HomePage,
  ProductPage,
  ProductIdPage,
  ProfilePage,
  ProfileAddress,
  ProfileOrder,
  Checkout,
  Invoice,
} from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminPage from "./pages/admin";
import ProductsPage from "./pages/admin/products";
import UsersListPage from "./pages/admin/users";
import { useDispatch, useSelector } from "react-redux";
import { RefreshToken, getUserAddresses } from "./store/actions/authAct";
import { useEffect } from "react";

import { getCArt } from "./store/actions/cart";
import { SetCategoriesAndTags } from "./store/actions/componentAct";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(RefreshToken());
    };

    fetchData();
  }, [dispatch]);

  

  const { user, token } = useSelector((state) => state.auth);
  // get cAtegory dan tag
  useEffect(() => {
    dispatch(SetCategoriesAndTags());
  });
  // get keranjang

  const cartItems = localStorage.getItem("cartItems");
  useEffect(() => {
    if (user && token && !cartItems) {
      dispatch(getCArt());
    }
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(getUserAddresses(token));
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products/:id" element={<ProductIdPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/invoice/:id" element={<Invoice />} />

        {/* ============= Admin ================== */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/users-list" element={<UsersListPage />} />
        {/* //================User profile =========== */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/address" element={<ProfileAddress />} />
        <Route path="/profile/orders" element={<ProfileOrder />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
