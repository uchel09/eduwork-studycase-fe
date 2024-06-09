import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import styles from "../../styles/style";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductDetailsCard = ({ setOpen, productData }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  //   const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };
  return (
    <div className="bg-[#fff]">
      {productData && (
        <div className="fixed w-full  h-screen top-0 left-0 bg-[#191919] bg-opacity-75 z-40 flex items-center justify-between">
          <div className="w-[90%] h-[90vh] 800px:w-[60%]  800px:h-[75vh] mx-auto bg-white rounded-md shadow-sm relative p-4 overflow-y-scroll ">
            <IoMdCloseCircle
              size={30}
              className="fixed right-4 top-4 z-50"
              onClick={() => setOpen(false)}
              color="red"
            />

            <div className="block w-full 800px:flex 800px:gap-x-10">
              {/* left modal  */}
              <div className="w-full 800px:w-[50%]">
                <img src={productData.image_Url[0].url} alt="" />
                <div className="pt-3 flex 800px:flex-col 1000px:flex-row">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(productData.discount_price)}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {" "}
                    {productData.price &&
                      new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(productData.price)}
                  </h3>
                </div>
                <h5 className="text-[16px] text-red-700  mb-5">
                  ({productData.total_sell}) Sold out
                </h5>
                <div className="flex mt-2">
                  <img
                    src={productData.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>
                      {productData.shop.name}
                    </h3>
                    <div className=" flex items-center   justify-start">
                      <h5 className=" text[15px]">
                        {" "}
                        {productData.shop.ratings}{" "}
                      </h5>
                      <AiFillStar
                        size={20}
                        className="mr-2  cursor-pointer"
                        color="#F6BA00"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-black mt-4  rounded-[4px]  h-11`}
                  onClick={() => handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Mesage <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
              {/* left modal  */}
              {/* Right modal  */}
              <div className="w-full 800px:w-[50%] pt-5 px-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {productData.name}
                </h1>
                <p>{productData.description}</p>
                <div className="flex mt-12 items-center justify-between">
                  <div className=" flex items-center">
                    <button
                      className="bg-gradient-to-r from-red-400 to-teal-500 text-white font-bold px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200  text-gray-500 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-red-400 to-teal-500 text-white font-bold px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  {click ? (
                    <AiFillHeart
                      size={25}
                      className="cursor-pointer  "
                      onClick={() => setClick(!click)}
                      color={click ? "red" : "#333"}
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={22}
                      className="cursor-pointer"
                      onClick={() => setClick(!click)}
                      color={click ? "red" : "#333"}
                      title="Add from wishlist"
                    />
                  )}
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 items-center`}
                >
                  {" "}
                  <span className="text-[#fff] flex items-center">
                    Add To Cart{" "}
                    <AiOutlineShoppingCart className="ml-2" size={20} />
                  </span>
                </div>
              </div>
              {/* right modal  */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsCard;
