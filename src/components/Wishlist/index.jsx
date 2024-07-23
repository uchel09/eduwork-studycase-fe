import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import {motion} from "framer-motion"

const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: "Iphone 14 Promax 256GB ssd and 8gb silver",
      dexcription: "test",
      price: 999000,
      img_url:
        "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
    },
    {
      name: "Iphone 14 Promax 256GB ssd and 8gb silver",
      dexcription: "test",
      price: 999000,
      img_url:
        "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
    },
    {
      name: "Iphone 14 Promax 256GB ssd and 8gb silver",
      dexcription: "test",
      price: 999000,
      img_url:
        "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 1, x: 450 }} // Atur posisi awal dan opasitas
      animate={{ opacity: 1, x: 0 }} // Atur posisi akhir dan opasitas saat komponen dimount
      exit={{ opacity: 1, x: 450 }} // Atur posisi dan opasitas saat komponen di-unmount
      transition={{ duration: 0.8 }}
      className="fixed top-0 right-0 z-10 h-screen w-full "
    >
      <div className="fixed top-0 right-0 min-h-full w-[30%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5  pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          {/* item length  */}
          <div className={`${styles.normalFlex}`}>
            <AiOutlineHeart className="ml-4" size={25} color="red" />
            <h5 className="pl-2 text-[20px] font-[500]">
              {cartData.length} item
            </h5>
          </div>
          {/* cart single item  */}
          <div className="w-full border-t">
            {cartData &&
              cartData.map((item, index) => {
                return <WishlistSingle key={index} data={item} />;
              })}
          </div>
        </div>
        {/* checkout button  */}
      </div>
    </motion.div>
  );
};

const WishlistSingle = ({ data }) => {
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center gap-x-3">
        <RxCross1 size={15} className="cursor-pointer mr-2" />
        <img
          src={data.img_url}
          alt=""
          className="w-[80px] h-[80px] ml-2 rounded-[25%]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-bold text-[15px] text-[#3321c8] ">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(data.price)}{" "}
          </h4>
        </div>
        <BsCartPlus
          size={25}
          className="cursor-pointer ml-2"
          title="Add to Cart"
        />
      </div>
    </div>
  );
};

export default Wishlist;
