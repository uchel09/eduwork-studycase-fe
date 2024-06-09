import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignUp,
  ActivationPage,
  HomePage,
  ProductPage,
  ProductIdPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
} from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./store/actions/user";
import { useSelector } from "react-redux";
import axios from "axios";
import { setAuthenticated } from "./store/slice/user";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      // Jika ada token yang tersimpan, atur isAuthenticated menjadi true
      dispatch(setAuthenticated(true));
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductIdPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/activation/:activationToken"
          element={<ActivationPage />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="black"
        style={{ color: "black" }}
      />
    </BrowserRouter>
  );
}

export default App;
