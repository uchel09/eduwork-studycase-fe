import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart }) => {
  const cartData = [
    {
      name: "Iphone 14 Promax 256GB ssd and 8gb silver",
      dexcription: "test",
      price: 999000,
    },
    {
      name: "Iphone 14 Promax 256GB ssd and 8gb silver",
      dexcription: "test",
      price: 999000,
    },
    {
      name: "Iphone 14 Promax 256GB ssd and 8gb silver",
      dexcription: "test",
      price: 999000,
    },
  ];

  return (
    <div className="fixed top-0 right-0 z-10 h-screen w-full bg-[#0000004b]">
      <div className="fixed top-0 right-0 min-h-full w-[30%] bg-white flex flex-col justify-between shadow-sm">
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
              {cartData.length} item
            </h5>
          </div>
          {/* cart single item  */}
          <div className="w-full border-t">
            {cartData &&
              cartData.map((item, index) => {
                return <CartSingle key={index} data={item} />;
              })}
          </div>
        </div>
        {/* checkout button  */}
        <div className="px-5 mb-3">
          <Link to="/checkout">
            <button className="h-[45px] flex items-center justify-center w-full bg-red-600 rounded-[5px] ">
              <h1 className="text-white text-[18px] font-[600] font-Poppins">
                Checkout Now (Rp 1.000.000)
              </h1>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center gap-x-3">
        <div className="flex flex-col items-center">
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer `}
            onClick={() => setValue(value + 1)}
          >
            <FaPlus size={15} color="white" />
          </div>
          <span>{value}</span>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer `}
            onClick={() => setValue(value > 1 ? value - 1 : value)}
          >
            <FaMinus size={15} color="white" />
          </div>
        </div>
        <img
          src="https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png"
          alt=""
          className="w-[80px] h-[80px] ml-2 rounded-[25%]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[gray]">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(data.price)}{" "}
            <span className="text-[12px]">X</span> {value}
          </h4>
          <h4 className="font-[600] text-[15px] text-[red] font-Poppins">
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
  );
};

export default Cart;
