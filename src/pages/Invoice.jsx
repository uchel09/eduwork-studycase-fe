import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataAPI } from "../utils/fetchApi";
import { useSelector } from "react-redux";
import HeaderC from "../components/Layouts/HeaderC";

const Invoice = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [invoice, setInvoice] = useState({});
  useEffect(() => {
    const getInvoiceById = async () => {
      if (token) {
        const res = await getDataAPI(`orders/invoice/${id}`, token);
        setInvoice(res.data.invoice[0]);
      }
    };
    getInvoiceById();
  }, [id, token]);

  const formatCurrency = (num) => {
    return num?.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };
  console.log(invoice);
  return (
    <div>
      <HeaderC />
      <div className="w-full flex flex-col items-center justify-center h-[90vh] bg-white">
        <span className="font-bold text-[24px]">Invoice</span>
        <div className="w-[60%] h-[50vh] bg-white border rounded-xl p-4">
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
                  <td>Status</td>
                  <td>{invoice?.order?.status}</td>
                </tr>
                <tr>
                  <td>Order Id</td>
                  <td>#{invoice?.order?.order_number}</td>
                </tr>
                <tr>
                  <td>Total Amount</td>
                  <td>{formatCurrency(invoice?.total)}</td>
                </tr>
                <tr>
                  <td className="font-bold">Billed To</td>
                  <td>
                    <div>{invoice?.user?.fullname}</div>{" "}
                    <div>{invoice?.user?.email}</div>{" "}
                    <div>
                      {invoice?.delivery_address?.provinsi},{" "}
                      {invoice?.delivery_address?.kabupaten},
                      {invoice?.delivery_address?.kecamatan}
                      {invoice?.delivery_address?.kelurahan}
                    </div>
                    <div>{invoice?.delivery_address?.detail}</div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Payment To</td>
                  <td>
                    <div>Russel Rumbino</div>
                    <div>russel@gmail.com</div>
                    <div>BRI</div>
                    <div>xxx-xxxxx-xxx-xxxx22</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
