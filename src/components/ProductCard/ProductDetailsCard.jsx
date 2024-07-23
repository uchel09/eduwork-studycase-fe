import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import styles from "../../styles/style";
import { AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import WishListButtonDetail from "../Button/WishListButtonDetail";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../store/actions/cart";

const ProductDetailsCard = ({ setOpen, product }) => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [click, setClick] = useState(false);
  const [selectImg, setSelectImg] = useState(0);

  //Form cart
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product?.colors[0]);
  const [size, setSize] = useState(product?.sizes[0]);

  // untuk description lihat selngkapnya
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllButton, setAllShowButton] = useState(false);
  useEffect(() => {
    if (product.description.length > 250) {
      setAllShowButton(true);
    }
  }, [product.description]);
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  //   const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};
  const decrementCount = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };
  const incrementCount = () => {
    setQty(qty + 1);
  };

  const handleAddToCart = async () => {
    if (!user || !token) {
      navigate("/login");
    } else {

      const items = [
        ...cartItems,
        { qty, color, size, product: product._id },
      ];
      dispatch(updateCart(items))
    }
  };
  return (
    <div className="bg-[#fff]">
      {product && (
        <div className="fixed w-full  h-screen top-0 left-0 bg-[#191919] bg-opacity-75 z-40 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 1, y: -100 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -50 }} 
            transition={{ duration: 0.5 }}
            className="w-[90%] h-[90vh] 800px:w-[60%]  800px:h-[75vh] mx-auto bg-white rounded-md shadow-sm relative p-4 overflow-y-scroll "
          >
            <IoMdCloseCircle
              size={30}
              className="absolute text-red right-4 top-4 z-50"
              onClick={() => setOpen(false)}
              color="red"
            />

            <motion.div
              initial={{ opacity: 1, y: -50 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -50 }} 
              transition={{ duration: 1 }}
              className="block w-full 800px:flex 800px:gap-x-10"
            >
              {/* left modal  */}
              <div className="w-full flex flex-col  md:w-[50%] gap-[7px]">
                <img src={product.images[selectImg].image_url} alt="" />
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
              {/* left modal  */}
              {/* Right modal  */}
              <div className="w-full 800px:w-[50%] pt-5 px-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {product.name}
                </h1>
                <p>
                  {isExpanded
                    ? product.description
                    : product.description.slice(0, 250)}
                </p>
                {showAllButton && (
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={toggleDescription}
                  >
                    {isExpanded ? "Sembunyikan" : "Lihat Selengkapnya"}
                  </span>
                )}

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
                            size === item ? "bg-teal-300" : "bg-slate-200"
                          } px-3 py-1 rounded-[7px]`}
                          onClick={() => setSize(item)}
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>

                {/* variant colors */}
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
                            color === item ? "bg-teal-300" : "bg-slate-200"
                          } px-3 py-1 rounded-[7px]`}
                          onClick={() => setColor(item)}
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>

                <div className="pt-3 flex 800px:flex-col 1000px:flex-row">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </h4>
                </div>
                <div className="flex mt-12 items-center justify-between">
                  <div className=" flex items-center">
                    <button
                      className="bg-gradient-to-r from-red-400 to-teal-500 text-white font-bold px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200  text-gray-500 font-medium px-4 py-[11px]">
                      {qty}
                    </span>
                    <button
                      className="bg-gradient-to-r from-red-400 to-teal-500 text-white font-bold px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div
                    className={`${styles.button} bg-black mt-4  rounded-[4px]  h-11`}
                    onClick={handleAddToCart}
                  >
                    <span className="text-white flex items-center">
                      Add To Cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                  <div
                    className={`${styles.button} bg-black mt-4  rounded-[4px]  h-11`}
                    onClick={() => handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Mesage <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                  <WishListButtonDetail click={click} setClick={setClick} />
                </div>
              </div>
              {/* right modal  */}
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsCard;
