import HeaderC from "../components/Layouts/HeaderC";
import Stepper from "../components/Stepper";

const Checkout = () => {
  return (
    <div>
      <HeaderC />
      <div className="w-[90%] mx-auto">
        <Stepper />
      </div>
    </div>
  );
};

export default Checkout;
