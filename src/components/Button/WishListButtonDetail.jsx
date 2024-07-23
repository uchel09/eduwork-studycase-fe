import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const WishListButtonDetail = ({click, setClick}) => {
  return (
    <>
      {click ? (
        <AiFillHeart
          className="cursor-pointer  text-[40px]"
          onClick={() => setClick(!click)}
          color={click ? "red" : "#333"}
          title="Remove from wishlist"
        />
      ) : (
        <AiOutlineHeart
          className="cursor-pointer text-[40px]"
          onClick={() => setClick(!click)}
          color={click ? "red" : "#333"}
          title="Add from wishlist"
        />
      )}
    </>
  );
};

export default WishListButtonDetail;
