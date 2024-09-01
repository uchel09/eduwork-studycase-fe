import { useEffect, useState, Fragment } from "react";
import ProfileLayout from "../../components/Layouts/profileLayOut";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { getDataAPI } from "../../utils/fetchApi";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PriceFormat } from "../../utils/priceFormat";

export const ProfileOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [openOrderIndices, setOpenOrderIndices] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await getDataAPI("orders/user", token);
        setOrders(res.data.orders);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      getOrders();
    }
  }, [token]);

  const subTotal = (order) => {
    return order.order_items?.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  };

  const toggleOrder = (index) => {
    setOpenOrderIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <ProfileLayout active={2}>
      <div className="w-[90%] mx-auto mt-[5%] h-full overflow-auto pb-10 relative ">
        <table className="text-left table-auto border-separate w-full">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="py-10"></th>
              <th>Order id</th>
              <th>subTotal</th>
              <th>Delivery fee</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody className="">
            {orders.map((order, index) => (
              <Fragment key={index}>
                <tr>
                  <td className="py-5">
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleOrder(index)}
                    >
                      {openOrderIndices.includes(index) ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </div>
                  </td>
                  <td>#{order.order_number}</td>
                  <td>{PriceFormat(subTotal(order))}</td>
                  <td>{PriceFormat(50000)}</td>
                  <td>{PriceFormat(subTotal(order) + 50000)}</td>
                  <td className="capitalize">{order.status}</td>
                  <td>
                    <button
                      className="py-1 px-3 text-white bg-[#2962ff] rounded-[20px]"
                      onClick={() => {
                        navigate(`/invoice/${order._id}`);
                      }}
                    >
                      invoice
                    </button>
                  </td>
                </tr>
                {openOrderIndices.includes(index) && (
                  <tr>
                    <td colSpan={7}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.1 }}
                        className="overflow-hidden bg-slate-300 p-4 rounded-md"
                      >
                        <table className="w-full text-left table-auto border-separate">
                          <thead>
                            <tr>
                              <th>Nama Barang</th>
                              <th>Color</th>
                              <th>Size</th>
                              <th>Jumlah</th>
                              <th>Harga</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.order_items.map((item, index) => (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.color}</td>
                                <td>{item.size}</td>
                                <td>{item.qty}</td>
                                <td>{PriceFormat(item.price)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </motion.div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </ProfileLayout>
  );
};

export default ProfileOrder;
