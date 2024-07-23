import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";

import { FaMinus, FaPlus } from "react-icons/fa";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateCart } from "../../store/actions/cart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useSelector } from "react-redux";

const Cart = ({ setOpenCart, cartItems }) => {
  const totalPrice = cartItems?.reduce((total, item) => {
    return total + item.price * item.qty; // Mengalikan price dengan qty untuk mendapatkan total price item tersebut
  }, 0);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <motion.div
      initial={{ opacity: 1, x: "40%" }} // Atur posisi awal dan opasitas
      animate={{ opacity: 1, x: 0 }} // Atur posisi akhir dan opasitas saat komponen dimount
      exit={{ opacity: 1, x: "40%" }} // Atur posisi dan opasitas saat komponen di-unmount
      transition={{ duration: 0.8 }}
      className="fixed top-0 right-0 z-10 h-screen w-full "
    >
      <div className="fixed top-0 right-0 min-h-full w-[40%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5  pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>
          {/* item length  */}
          <div className={`${styles.normalFlex}`}>
            <IoBagHandleOutline className="ml-4" size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {cartItems.length} item
            </h5>
          </div>
          {/* cart single item  */}
          <div className="w-full overflow-y-auto h-[75vh] flex flex-col">
            {cartItems &&
              cartItems.map((item, index) => {
                return (
                  <CartSingle key={index} data={item} cartItems={cartItems} />
                );
              })}
          </div>
        </div>
        {/* checkout button  */}
        <div className={`px-5 mb-3`}>
          <div>
            <button
              className={`h-[45px] flex items-center justify-center w-full ${
                cartItems?.length === 0 ? "bg-slate-400" : "bg-[#2962ff]"
              } rounded-[5px] `}
              onClick={cartItems?.length === 0 ? () => {} : handleCheckOut}
            >
              <h1 className="text-white text-[18px] font-[600] font-Poppins">
                Checkout Now{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(totalPrice)}{" "}
              </h1>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CartSingle = ({ data, cartItems }) => {
  const [qty, setQty] = useState(data.qty);
  const totalPrice = data.price * qty;
  const dispatch = useDispatch();

  const handlePlus = async () => {
    setQty((prevQty) => {
      const newQty = prevQty + 1;
      dispatch(
        updateCart(
          [
            ...cartItems,
            {
              qty: newQty,
              color: data.color,
              size: data.size,
              product: data.product,
            },
          ],
          true
        )
      );
      return newQty;
    });
  };

  const handleMines = async () => {
    setQty((prevQty) => {
      const newQty = prevQty - 1;
      if (prevQty === 1) {
        return prevQty;
      }
      dispatch(
        updateCart([
          ...cartItems,
          {
            qty: newQty,
            color: data.color,
            size: data.size,
            product: data.product,
          },
        ])
      );
      return newQty;
    });
  };

  return (
    <div className="flex  w-full  gap-x-1 pl-2 pb-1 border-b border-slate-400">
      <div className="mt-1 flex flex-col items-center justify-center h-full">
        <div
          className={`bg-[#2962ff] border border-[#e4434373] rounded-full w-[20px] h-[20px] ${styles.normalFlex} justify-center cursor-pointer `}
          onClick={handlePlus}
        >
          <FaPlus size={15} color="white" />
        </div>
        <span>{qty}</span>
        <div
          className={`bg-[#2962ff] border border-[#e4434373] rounded-full w-[20px] h-[20px] ${styles.normalFlex} justify-center cursor-pointer `}
          onClick={handleMines}
        >
          <FaMinus size={15} color="white" />
        </div>
      </div>

      <div className="w-full flex items-center gap-x-3">
        <img
          src={data.image_url}
          alt=""
          className="w-[80px] h-[80px] rounded-[25%]"
        />
        <div className="flex flex-col">
          <h1>
            {data.name.length > 60 ? data.name.slice(0, 50) + "..." : data.name}
          </h1>
          <div className="flex text-slate-400 gap-10">
            <h4 className="text-[14px]">size : {data.size.toUpperCase()}</h4>
            <h4 className="text-[14px]">color : {data.color.toUpperCase()}</h4>
          </div>
          <div className="flex">
            <h4 className="font-[400] text-[15px] text-[gray]">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(data.price)}{" "}
              <span className="text-[12px]">X</span> {qty}
            </h4>
            <h4 className="font-[600] text-[15px] ml-3 text-[#2962ff] font-Poppins">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(totalPrice)}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
