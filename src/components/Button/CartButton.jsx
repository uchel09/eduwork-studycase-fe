import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartButton = ({ setOpen }) => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const handleCart = () => {
    if (!user || !token) {
      navigate("/login");
    }
    setOpen(true);
  };
  return (
    <AiOutlineShoppingCart
      className="cursor-pointer transition-all duration-200 ease-in-out text-[25px] hover:text-[30px] absolute right-[32px] bottom-[2px]"
      color="#444"
      title="Add to Cart"
      onClick={() => handleCart()}
    />
  );
};

export default CartButton;
