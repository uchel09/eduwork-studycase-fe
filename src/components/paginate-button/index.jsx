import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

const PanginationButton = ({ totalPages, setCurrentPage, currentPage }) => {
  const handleClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const paginationVariant = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;

  return (
    <motion.div variants={paginationVariant} initial="hidden" animate="visible">
      <ReactPaginate
        onPageChange={handleClick}
        previousLabel={
          showPrevButton ? (
            <span className="w-[70px] text-white font-bold h-10 flex items-center justify-center mr-3 bg-[gray] hover:bg-[#2962ff] rounded-md">
              Prev
            </span>
          ) : null
        }
        breakLabel={<span className="mx-2 font-bold text-[18px]">. . .</span>}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        nextLabel={
          showNextButton ? (
            <span className="w-[70px] font-bold text-white h-10 flex items-center justify-center ml-3 bg-[gray] hover:bg-[#2962ff] rounded-md">
              Next
            </span>
          ) : null
        }
        forcePage={currentPage}
        renderOnZeroPageCount={null}
        activeClassName="bg-[#2962ff] text-white"
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border border-solid border-[#2962ff]  h-8 w-8 rounded-md mx-2 flex items-center justify-center font-bold text-[#2962ff] hover:text-white hover:bg-[#2962ff]"
      />
    </motion.div>
  );
};

export default PanginationButton;
