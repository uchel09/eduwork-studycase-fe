import { motion } from "framer-motion";

import { IoMdCloseCircle } from "react-icons/io";

const Modal = ({ setOpen, children }) => {
  return (
    <div className="fixed w-full  h-screen top-0 left-0 bg-[#191919] bg-opacity-75 z-40 flex items-center justify-between">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="w-[90%] h-[90vh] 800px:w-[60%]  800px:h-[75vh] mx-auto bg-white rounded-md shadow-sm relative p-4 overflow-y-scroll "
      >
        <IoMdCloseCircle
          size={30}
          className="absolute text-red right-4 top-4 z-50 cursor-pointer"
          onClick={() => setOpen(false)}
          color="red"
        />
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
