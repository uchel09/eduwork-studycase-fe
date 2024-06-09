import { useParams } from "react-router-dom";
import HeaderC from "../components/Layouts/HeaderC";
import Footer from "../components/Layouts/Footer";
import { useEffect, useState } from "react";
import { productData } from "../static/productData";

import styles from "../styles/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductIdPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(1);
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };
  const [select, setSelect] = useState(1);
  useEffect(() => {
    const dataDetail = productData.find((i) => i.id === parseInt(id));
    if (dataDetail) {
      setData(dataDetail);
    } else {
      console.log(`Product with ID ${id} not found`);
    }
  }, [id]);

  return (
    <div>
      <HeaderC />
      <div className="bg-white ">
        {data && (
          <section className={`${styles.section} w-[90%] 800px:w-80% `}>
            <div className="w-full py-5">
              <div className="block w-full 800px:flex">
                {/* left  section  */}
                <div className="w-full 800px:w-[50%]">
                  <div className="w-full flex flex-col">
                    <div className="self-center 800px:self-start">
                      <img
                        src={data.image_Url[0].url}
                        alt=""
                        className="w-[80%] p-2"
                      />
                    </div>
                    <div className="flex">
                      <img
                        src={data.image_Url[0].url}
                        alt=""
                        className={`${
                          select === 0
                            ? "border-4 border-red-200"
                            : "border-none"
                        } cursor-pointer  w-[120px] p-2`}
                        onClick={() => setSelect(0)}
                      />
                      <img
                        src={data.image_Url[0].url}
                        alt=""
                        className={`${
                          select === 1
                            ? "border-4 border-red-200"
                            : "border-none"
                        } cursor-pointer  w-[120px] p-2`}
                        onClick={() => setSelect(1)}
                      />
                    </div>
                  </div>
                </div>
                {/* right  section  */}
                <div className="800px:w-[50%] w-full">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  <p>{data.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(data.discount_price)}
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.price &&
                        new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(data.price)}
                    </h3>
                  </div>
                  <div
                    className={`${styles.normalFlex} mt-12 justify-between pr-3`}
                  >
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
                        size={35}
                        className="cursor-pointer ml-10 "
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={35}
                        className="cursor-pointer ml-10 "
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Add from wishlist"
                      />
                    )}
                  </div>
                  <button
                    className={`${styles.button} mt-6 rounded-[4px] h-11 items-center`}
                  >
                    <span className="text-[#fff] flex items-center">
                      Add To Cart{" "}
                      <AiOutlineShoppingCart className="ml-2" size={20} />
                    </span>
                  </button>
                  <div className="flex items-center pt-6">
                    <img
                      src={data.shop.shop_avatar.url}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-3"
                    />
                    <div className="pr-8 flex flex-col">
                      <h3 className={`${styles.shop_name}  cursor-pointer`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({data.shop.ratings}) Ratings
                      </h5>
                    </div>
                    <div
                      className={`${styles.button} bg-teal-500 mt-4 rounded h-11`}
                    >
                      <span className="text-white">Send Message</span>
                      <AiOutlineMessage size={20} className="ml-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductIdPage;
