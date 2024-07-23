import { useParams } from "react-router-dom";
import HeaderC from "../components/Layouts/HeaderC";
import Footer from "../components/Layouts/Footer";
import { useEffect, useState } from "react";

import styles from "../styles/style";
import { AiOutlineMessage } from "react-icons/ai";
import WishListButtonDetail from "../components/Button/WishListButtonDetail";

// import { useDispatch, useSelector } from "react-redux";
// import { getProductById } from "../store/actions/productAct";
import { getDataAPINT } from "../utils/fetchApi";

const ProductIdPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const getProductById = async () => {
      const { data } = await getDataAPINT(`products/${id}`);
      setProduct(data.product);
    };
    getProductById();
  }, [id]);
  // const { product } = useSelector((state) => state.product);

  const [selectImg, setSelectImg] = useState(0);
  const [selectSize, setSelectSize] = useState(0);
  const [selectColor, setSelectColor] = useState(0);
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

  return (
    <div>
      <div className="bg-white w-full h-[100vh]">
        <HeaderC />
        {product && (
          <section className={`${styles.section} w-[90%] md:w-80% `}>
            <div className="w-full py-5">
              <div className="block w-full md:flex">
                {/* left  section  */}
                <div className="w-full md:w-[50%]">
                  <div className="w-[80%] flex flex-col">
                    <div className="self-center md:self-start">
                      <img
                        src={product?.images[selectImg]?.image_url}
                        alt=""
                        className="w-full md:w-[90%] p-2"
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      {product?.images?.length > 0 &&
                        product?.images?.map((item, index) => {
                          return (
                            <div key={index}>
                              <img
                                src={item.image_url}
                                alt=""
                                className={`${
                                  selectImg === index
                                    ? "border-4  border-[#3321c8]"
                                    : "border-none"
                                } cursor-pointer object-contain rounded-[10px]  h-[90px] p-2`}
                                onClick={() => setSelectImg(index)}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                {/* right  section  */}
                <div className="md:w-[50%] w-full">
                  <h1 className={`${styles.productTitle}`}>{product?.name}</h1>
                  <p>
                    {product?.description.length > 1200
                      ? product.description.slice(0, 1350) + "..."
                      : product?.description}
                  </p>
                  <div className="flex pt-3">
                    <h3 className={`text-[18px] font-bold`}>
                      {product?.price &&
                        new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(product?.price)}
                    </h3>
                  </div>

                  {/* variant sizes */}
                  {product?.sizes.length > 0 && (
                    <h4 className="font-bold my-5">Pilih Ukuran :</h4>
                  )}
                  <div className="flex flex-wrap gap-[10px]">
                    {product?.sizes.length > 0 &&
                      product.sizes.map((item, index) => {
                        return (
                          <span
                            key={index}
                            className={`cursor-pointer ${
                              selectSize === index
                                ? "bg-teal-300"
                                : "bg-slate-200"
                            } px-3 py-1 rounded-[7px]`}
                            onClick={() => setSelectSize(index)}
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>

                  {/* variant colors  */}
                  {product?.colors.length > 0 && (
                    <h4 className="font-bold my-5">Pilih Warna :</h4>
                  )}
                  <div className="flex flex-wrap gap-[10px]">
                    {product?.colors.length > 0 &&
                      product.colors.map((item, index) => {
                        return (
                          <span
                            key={index}
                            className={`cursor-pointer ${
                              selectColor === index
                                ? "bg-teal-300"
                                : "bg-slate-200"
                            } px-3 py-1 rounded-[7px]`}
                            onClick={() => setSelectColor(index)}
                          >
                            {item}
                          </span>
                        );
                      })}
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
                    <WishListButtonDetail click={click} setClick={setClick} />
                  </div>
                  <div className="flex items-center  pt-6">
                    <div className="pr-8 flex flex-col"></div>
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
