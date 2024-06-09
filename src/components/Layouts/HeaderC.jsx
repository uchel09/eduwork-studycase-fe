import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import { useState } from "react";
import { productData, categoriesData } from "../../static/productData.js";
// icon
import { IoSearch } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Cart from "../Cart";
// icon

import Dropdown from "./Dropdown.jsx";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import { imageUrl } from "../../server.js";
import Wishlist from "../Wishlist/index.jsx";

const HeaderC = ({ activeHeading }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const results = productData.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchData(results);
  };
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <section className={`${styles.section}`}>
      {/* continer hero and search  */}
      <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
        <div>
          <Link to="/">
            <span className="text-green-500 text-3xl font-bold">CH</span>
            <span className="text-yellow-500 text-3xl font-Roboto">Shop</span>
          </Link>
        </div>
        {/*   search box  */}
        <div className="w-[50%] relative">
          <input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
          />
          <IoSearch
            size={30}
            className="absolute right-2 top-1.5 cursor-pointer"
          />
          {searchTerm && searchData.length !== 0 ? (
            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
              {searchData &&
                searchData.map((i, index) => {
                  return (
                    <Link to="/products" key={index}>
                      <div className="w-full flex items-start-py-3">
                        <img
                          src={`${i.image_Url[0].url}`}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : (
            <div className="hidden"></div>
          )}
        </div>
        <div className={`${styles.button}`}>
          <Link to="/seller">
            <h1 className="text-[#fff] flex items-center ">
              <span>Become Seller</span> <FaArrowRight className="ml-2" />
            </h1>
          </Link>
        </div>
      </div>
      {/* continer hero and search  */}
      {/* ====================================== */}
      {/* categories and nav  */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropdown(!dropdown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <AiOutlineMenuUnfold
                size={30}
                className="absolute top-3 left-2"
              />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              {dropdown ? (
                <RiArrowDropUpLine
                  size={30}
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={() => setDropdown(!dropdown)}
                />
              ) : (
                <RiArrowDropDownLine
                  size={30}
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={() => setDropdown(!dropdown)}
                />
              )}

              {dropdown ? (
                <Dropdown
                  categoriesData={categoriesData}
                  setDropDown={setDropdown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            {/* wishlist Icon  */}
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <FaRegHeart size={27} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>
            {/* cartIcon  */}
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px] "
                onClick={() => setOpenCart(true)}
              >
                <PiShoppingCartBold size={27} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div
                className="text-white relative cursor-pointer mr-[15px]"
                onClick={() => handleLogout()}
              >
                <span>logout</span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {user ? (
                  <Link to="/profile">
                    <img
                      src={`${imageUrl}/${user.avatar}`}
                      alt=""
                      className="h-[35px] w-[35px] rounded-full"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={27} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* Cart part popUP */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* Wishlist part popUP */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>
      {/* categories and nav  */}
    </section>
  );
};

export default HeaderC;
