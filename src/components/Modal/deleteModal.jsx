import { motion } from "framer-motion";

const DeleteModal = ({ text, setOpenDelete, handleDelete = () => {} }) => {
  return (
    <div className=" absolute left-0 right-0 top-0 bottom-0">
      <motion.div
        initial={{ opacity: 0, y: -50, x: -50 }} // Atur posisi awal dan opasitas
        animate={{ opacity: 1, y: 0 }} // Atur posisi akhir dan opasitas saat komponen dimount
        exit={{ opacity: 0, y: -50 }} // Atur posisi dan opasitas saat komponen di-unmount
        transition={{ duration: 0.5 }}
        className={`absolute bg-white border flex flex-col w-[40%] h-[20vh] z-[9] top-[40vh] left-[30%] 
      rounded-[16px] items-center justify-between p-[1rem]
      `}
      >
        {text}{" "}
        <div className="flex w-full gap-10 items-center justify-center">
          {" "}
          <button
            onClick={handleDelete}
            className="bg-[#3321c8] w-[20%] text-white border rounded-lg"
          >
            Yes
          </button>{" "}
          <button
            onClick={() => setOpenDelete(false)}
            className="border w-[20%] rounded-lg bg-white"
          >
            {" "}
            No
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteModal;
