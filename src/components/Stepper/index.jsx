import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDataAPI } from "../../utils/fetchApi";
import { toast } from "react-toastify";
import { setUpdateCart } from "../../store/slice/cart";
import { useNavigate } from "react-router-dom";

const steps = ["Alamat Pengiriman", "Konfirmasi Pembelian"];

const Stepper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const { addresses, token } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const delivery_address = JSON.parse(localStorage.getItem("mainAddress"));
  const delivery_fee = 50000;
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePay = async () => {
    try {
      setLoading(true);
      const res = await postDataAPI(
        "orders",
        { delivery_fee, delivery_address, cartItems },
        token
      );
      if (res.data.success === true) {
        localStorage.removeItem("cartItems");
        dispatch(setUpdateCart([]));

        navigate(`/invoice/${res.data.order._id}`);
        toast.success("Order created successfully");
      } else {
        toast.error("Failed to create order, internal server error");
      }
      setLoading(false);
    } catch (error) {
      toast.error("ada sesuatu yang salah");
      console.log(error);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <SelectAddress addresses={addresses} />;
      case 1:
        return (
          <div>
            <PayConfirmation
              cartItems={cartItems}
              address={delivery_address}
              delivery_fee={delivery_fee}
              loading={loading}
            />
          </div>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex-1 text-center py-2 border-b-4 ${
              currentStep === index ? "border-blue-500" : "border-gray-300"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
      <div className="mb-4 p-4 border rounded-lg w-full">
        {renderStepContent(currentStep)}
      </div>
      <div className="flex justify-between w-full">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded ${
            currentStep === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Back
        </button>
        {currentStep === steps.length - 1 ? (
          <button
            disabled={loading}
            onClick={handlePay}
            className={`px-4 py-2 rounded ${loading && "cursor-not-allowed"} bg-blue-500 text-white`}
          >
            Bayar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded ${"bg-green-500 text-white"}`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

const SelectAddress = ({ addresses }) => {
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const savedAddress = localStorage.getItem("mainAddress");
    return savedAddress ? JSON.parse(savedAddress)._id : null;
  });

  const handleCheckboxChange = (address) => {
    setSelectedAddressId(address._id);
    localStorage.setItem("mainAddress", JSON.stringify(address));
  };

  return (
    <div className="overflow-auto w-full h-[60vh] px-3 shadow-lg mt-3 gap-[10px]">
      {addresses.map((item) => (
        <div
          key={item._id}
          className="flex flex-col shadow-lg mb-2 py-2 rounded-lg px-3 relative"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedAddressId === item._id}
              onChange={() => handleCheckboxChange(item)}
              className="mr-2 cursor-pointer"
            />
            <span className="font-bold">{item.name}</span>
          </div>
          <span>{item.phone_number}</span>
          <span>
            {item.provinsi}, {item.kabupaten}, {item.kecamatan},{" "}
            {item.kelurahan}
          </span>
          <span>{item.detail}</span>
        </div>
      ))}
    </div>
  );
};

const PayConfirmation = ({ cartItems, address, delivery_fee }) => {
  let subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // Fungsi untuk memformat angka menjadi format mata uang
  const formatCurrency = (num) => {
    return num.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  };

  return (
    <div className="w-full">
      <table className="w-full text-left table-auto border-separate">
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alamat</td>
            <td>
              {address && (
                <>
                  <div>{address.name}</div>
                  <div>{address.number_phone}</div>
                  <div>{address.detail}</div>
                  <div>
                    {address.provinsi}, {address.kabupaten}, {address.kecamatan}
                    , {address.kelurahan}
                  </div>
                </>
              )}
            </td>
          </tr>
          <tr>
            <td>Sub Total</td>
            <td>{formatCurrency(subTotal)}</td>
          </tr>
          <tr>
            <td>Ongkir</td>
            <td>{formatCurrency(delivery_fee)}</td>
          </tr>
          <tr>
            <td className="font-bold">Total</td>
            <td>{formatCurrency(delivery_fee + subTotal)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Stepper;
