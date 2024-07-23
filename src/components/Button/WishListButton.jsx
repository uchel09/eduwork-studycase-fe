import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const WishListButton = ({ click, setClick }) => {
  return (
    <>
      {click ? (
        <AiFillHeart
          className="cursor-pointer absolute text-[22px] transition-all duration-200 ease-linear hover:text-[28px] right-[2px] bottom-[2px]"
          onClick={() => setClick(!click)}
          color={click ? "red" : "#333"}
          title="Remove from wishlist"
        />
      ) : (
        <AiOutlineHeart
          className="cursor-pointer absolute text-[22px] transition-all duration-200 ease-in-out hover:text-[28px] right-[2px] bottom-[2px]"
          onClick={() => setClick(!click)}
          color={click ? "red" : "#333"}
          title="Add from wishlist"
        />
      )}
    </>
  );
};

export default WishListButton;
