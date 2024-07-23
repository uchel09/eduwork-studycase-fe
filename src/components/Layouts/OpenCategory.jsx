import { motion } from "framer-motion";

const OpenCategory = ({ category }) => {
  return (
    <motion.div
      initial={{ opacity: 1, x: "-120%" }} // Atur posisi awal dan opasitas
      animate={{ opacity: 1, x: 0 }} // Atur posisi akhir dan opasitas saat komponen dimount
      exit={{ opacity: 1, x:"120%" }} // Atur posisi dan opasitas saat komponen di-unmount
      transition={{ duration: 0.5 }}
      className="bg-white w-full rounded-full h-[20vh] shadow-xl absolute  -bottom-[20vh]"
    >
      <div className="flex flex-wrap w-full overflow-auto">{category}</div>
    </motion.div>
  );
};

export default OpenCategory;
