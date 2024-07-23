import { useState } from "react";
import ProfileLayout from "../../components/Layouts/profileLayOut";

import styles from "../../styles/style";
import Modal from "../../components/Modal";

import CreateAddressModal from "./createAddressModal";
import { useSelector } from "react-redux";

import { BsTrash } from "react-icons/bs";
import DeleteModal from "../../components/Modal/deleteModal";
import { deleteDataAPI } from "../../utils/fetchApi";
import { toast } from "react-toastify";

export const ProfileAddress = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { addresses } = useSelector((state) => state.auth);
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const savedAddress = localStorage.getItem("mainAddress");
    return savedAddress ? JSON.parse(savedAddress)._id : null;
  });

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleCheckboxChange = (address) => {
    setSelectedAddressId(address._id);
    localStorage.setItem("mainAddress", JSON.stringify(address));
  };

  const handleDelete = async () => {
    try {
      const res = await deleteDataAPI(`delivery-addresses/${deleteId}`, token);
      toast.success(res.data.message);
      setOpenDelete(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <ProfileLayout active={3}>
      <div className="flex w-full mx-auto flex-col mt-5">
        <form onSubmit={handleSearch} className="w-full flex gap-2 mt-2">
          <div className={`${styles.containerStyle} h-[45px] w-[50%]`}>
            <input
              type="text"
              className={`${styles.inputStyle}`}
              placeholder="Search address"
            />
          </div>
          <button type="submit" className="px-3 rounded-lg text-white py-1 bg-[#2962ff]">
            Search
          </button>
        </form>
        <button
          onClick={() => setOpen(true)}
          className="px-2 py-2 rounded-xl mt-3 bg-[#2962ff] w-[200px] text-white"
        >
          Create Address
        </button>
      </div>

      {/* Card Address  */}
      <div className="overflow-auto w-[70%] h-[60vh] px-3 shadow-lg mt-3 gap-[10px]">
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
            <BsTrash
              onClick={() => {
                setOpenDelete(true);
                setDeleteId(item._id);
              }}
              className="text-[20px] absolute bottom-2 right-2 text-red-500 cursor-pointer"
            />
          </div>
        ))}
      </div>
      {openDelete && (
        <DeleteModal
          setOpenDelete={setOpenDelete}
          handleDelete={handleDelete}
          text="Kamu yakin menghapus alamat ini ?"
        />
      )}

      {open && (
        <Modal setOpen={setOpen}>
          <CreateAddressModal />
        </Modal>
      )}
    </ProfileLayout>
  );
};

export default ProfileAddress;
