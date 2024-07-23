import { useState } from "react";
import { Link } from "react-router-dom";
import ProductDetailsCard from "./ProductDetailsCard";
import { AiFillStar } from "react-icons/ai";
import WishListButton from "../Button/WishListButton";
import CartButton from "../Button/CartButton";
import { IoTrashBinOutline } from "react-icons/io5";
import { PriceFormat } from "../../utils/priceFormat";

const ProductCard = ({
  product,
  admin = false,
  setOpenDelete,
  setDeleteId = "",
}) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`relative w-[190px] 
      flex flex-col items-start h-[330px]
    bg-white rounded-lg 
      shadow-md  mb-2 cursor-pointer`}
      >
        <Link to={`/products/${product?._id}`}>
          <img
            src={`${product?.images[0]?.image_url}`}
            alt=""
            className="w-[full] h-[200px] object-contain"
          />
        </Link>

        {/* name  */}
        <h4 className="px-1 h-[45px] font-[500] text-[12px] 600px:text-[16px]">
          {product?.name.length > 40
            ? product?.name.slice(0, 40) + "..."
            : product?.name}
        </h4>
        {/* name  */}

        {/* price  */}
        <div className="px-1 flex items-start justify-between w-full mt-[10px]">
          <div className="flex flex-col">
            <h4 className={`font-bold text-[16px]`}>
              {product?.price ? PriceFormat(product?.price) : null}
            </h4>
          </div>
        </div>
        {/* price  */}

        {/* star and sold  */}

        <div className="px-1 mt-[2px]">
          <div className="flex items-center gap-1">
            <AiFillStar className="text-yellow-500 text-[18px]" />
            <span className="text-[14px] text-slate-400">
              4.7 | 300+ terjual
            </span>
          </div>
        </div>
        {/* star and sold  */}

        {/* icon cart, view and wishlist */}
        {admin ? (
          <div>
            <IoTrashBinOutline
              onClick={() => {
                setOpenDelete(true);
                setDeleteId(product._id);
              }}
              className="cursor-pointer text-red-500 text-[20px] hover:text-[24px] absolute right-[2px] bottom-[2px]"
            />
          </div>
        ) : (
          <div>
            <WishListButton click={click} setClick={setClick} />
            <CartButton setOpen={setOpen} />
          </div>
        )}

        {open && <ProductDetailsCard setOpen={setOpen} product={product} />}
      </div>
    </>
  );
};

ProductCard.Skeleton = function ProductCardSkeleton() {
  return (
    <>
      <div
        className={`relative w-[190px] 
      flex flex-col items-start h-[330px]
    bg-white rounded-lg 
      shadow-md  mb-2 cursor-pointer`}
      >
        <div className="w-[179px] mx-auto rounded-lg bg-[#d7d5d5] h-[200px] animate-pulse overflow-hidden"></div>

        <h4 className="px-1 h-[20px] mt-4 ml-2 w-[170px] bg-[#d7d5d5] animate-pulse rounded-md 600px:text-[16px]"></h4>
        {/* name  */}

        {/* price  */}
        <div className="px-1 flex items-start justify-between w-full mt-[10px] rounded-md"></div>
        {/* price  */}

        {/* star and sold  */}

        <div className="px-1 mt-[2px] w-[150px] h-3 ml-2 bg-[#d7d5d5] animate-pulse"></div>
        {/* star and sold  */}
        <div className="w-[25px] rounded-md h-[25px] absolute right-[10px] bottom-[10px] bg-[#d7d5d5] animate-pulse  "></div>
        <div className="w-[25px] h-[25px] rounded-md absolute right-[50px] bottom-[10px] bg-[#d7d5d5] animate-pulse  "></div>
      </div>
    </>
  );
};

export default ProductCard;
