import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/style";
import ProductDetailsCard from "./ProductDetailsCard";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";

const ProductCard = ({ productData }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative w-full h-[400px]   bg-white rounded-lg shadow-md p-3 mb-2 cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/products/${productData.id}`}>
          <img
            src={`${productData.image_Url[0].url}`}
            alt=""
            className="w-11/12 h-[170px] object-contain"
          />
        </Link>
        <Link to={``}>
          <h5 className={`${styles.shop_name}`}>{productData.shop.name}</h5>
        </Link>
        <Link to={`/products/${productData.id}`}>
          <h4 className="pb-3 font-[500] text-[14px] 600px:text-[16px]">
            {productData.name.length > 40
              ? productData.name.slice(0, 40) + "..."
              : productData.name}
          </h4>
          {/* star  */}
          <div className="flex">
            <AiFillStar
              size={20}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
            <AiFillStar
              size={20}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
            <AiFillStar
              size={20}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
            <AiFillStar
              size={20}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
            <AiOutlineStar
              size={20}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
          </div>
          {/* price  */}
          <div className="py-2 flex items-start justify-between w-full">
            <div className="flex flex-col">
              <h4 className={`${styles.price}`}>
                {productData.price
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(productData.price)
                  : null}
              </h4>

              <h5 className={`${styles.productDiscountPrice}`}>
                {productData.price === 0
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(productData.price)
                  : new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(productData.discount_price)}
              </h5>
              <span className="font-[400] text-[17px] text-[#68d284]">
                sold {productData.total_sell}
              </span>
            </div>
          </div>

          {/* icon cart, view and wishlist */}
        </Link>
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Add from wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => {
              setOpen(!open);
            }}
            color="#333"
            title="See details"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            color="#444"
            title="Add to Cart"
          />
          {open && (
            <ProductDetailsCard setOpen={setOpen} productData={productData} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
