import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Cart from "../Cart";
import { useSelector } from "react-redux";
import { imageUrl } from "../../server.js";
import Wishlist from "../Wishlist/index.jsx";
import { chellShopLogo, UserImg } from "../../assets/index.js";
import { AnimatePresence } from "framer-motion";
import OtherInput from "../MyInput/OtherInput.jsx";
import DropDownHover from "../DropDown/DropDownHover.jsx";

const HeaderC = ({
  isCtgInCategories,
  isTagInTags,
  handleCategoryClick,
  handleTagClick,
  setQ,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { categories, tags } = useSelector((state) => state.component);
  const [search, setSearch] = useState("");

  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const isPathProduct = location.pathname === "/products";

  const handleCategory = (ctgName) => {
    if (!isPathProduct) {
      navigate(`/products?q=&page=0&categories[]=${ctgName}`);
    } else {
      handleCategoryClick(ctgName);
    }
  };

  const handleTag = (tagName) => {
    if (!isPathProduct) {
      navigate(`/products?q=&page=0&tags[]=${tagName}`);
    } else {
      handleTagClick(tagName);
    }
  };
  const handleSearch = () => {
    if (!isPathProduct) {
      navigate(`/products?q=${search}&page=0`);
    } else {
      setQ(search);
      setSearch("");
    }
  };

  return (
    <section className={`${styles.section} mb-[70px] bg-white`}>
      <div
        className={`
          border-b border-[#f0f8f8] fixed top-0 left-0 z-[99]
          transition hidden 800px:flex flex-col items-center justify-center w-full bg-white h-[10vh]`}
      >
        <div
          className={`w-11/12 mx-auto relative flex items-center justify-between`}
        >
          <div className="flex text-white items-center">
            <Link
              to="/"
              className="w-[20%] text-[#2962ff] items-center cursor-pointer flex text-[25px] font-bold"
            >
              <img width={100} height={100} src={chellShopLogo} alt="" />
              <span>Shop</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <DropDownHover title="Category">
              {categories?.map((ctg, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 border border-[#2962ff] rounded-full cursor-pointer ${
                    isPathProduct && isCtgInCategories(ctg?.name)
                      ? "bg-[#2962ff] text-white"
                      : "bg-[white] text-[#2962ff]"
                  }`}
                  onClick={() => handleCategory(ctg?.name)}
                >
                  {ctg?.name}
                </div>
              ))}
            </DropDownHover>
            <DropDownHover title="Tag">
              {tags?.map((tag, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 border border-[#2962ff] rounded-full cursor-pointer ${
                    isPathProduct && isTagInTags(tag?.name)
                      ? "bg-[#2962ff] text-white"
                      : "bg-[white] text-[#2962ff]"
                  }`}
                  onClick={() => handleTag(tag.name)}
                >
                  {tag?.name}
                </div>
              ))}
            </DropDownHover>
            <div className={`flex items-center gap-3 mr-3`}>
              <OtherInput
                placeholder="Temukan Produk..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                inputStyle="w-full bg-transparent py-[5px] px-1 outline-none text-base"
                containerStyle="w-full md:w-[400px] lg:w-[600px] items-center flex h-[42px] border-gray-400 border rounded-md px-3 gap-2 focus-within:border-2 focus-within:border-gray-700"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="bg-[#2962ff] hover:opacity-80 h-[42px] text-white px-4 rounded-lg"
              >
                Cari
              </button>
            </div>
          </div>
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <FaRegHeart size={27} color="black" />
                <span
                  className={`absolute right-0 top-0 rounded-full bg-[#2962ff] w-4 h-4 
                    p-0 m-0 text-white font-mono text-[12px] leading-tight text-center`}
                >
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <PiShoppingCartBold size={27} color="black" />
                <span
                  className={`${
                    cartItems.length === 0 && "hidden"
                  } absolute right-0 top-0 rounded-full bg-[#2962ff] w-4 h-4 
                    p-0 m-0 text-white font-mono text-[12px] leading-tight text-center`}
                >
                  {cartItems?.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {user ? (
                  <Link to={user.role === "admin" ? "/admin" : "/profile"}>
                    <img
                      src={
                        user.avatar
                          ? `${imageUrl}/${user.avatar}`
                          : `${UserImg}`
                      }
                      alt=""
                      className="h-[35px] w-[35px] rounded-full"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={27} color="black" />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <AnimatePresence>
            {openCart && (
              <Cart setOpenCart={setOpenCart} cartItems={cartItems} />
            )}
            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HeaderC;
