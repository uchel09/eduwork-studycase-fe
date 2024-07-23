import PropTypes from "prop-types";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  showPrevButton = true,
  showNextButton = true,
}) => {
  const handleClick = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Jumlah maksimal halaman yang ditampilkan di sekitar halaman aktif
    const edgePages = 2; // Halaman yang ditampilkan di awal dan akhir

    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 0;
      endPage = totalPages - 1;
    } else {
      if (currentPage <= edgePages + 2) {
        startPage = 0;
        endPage = Math.min(maxPagesToShow - 1, totalPages - 1);
      } else if (currentPage + 2 >= totalPages - edgePages) {
        startPage = Math.max(totalPages - maxPagesToShow, 0);
        endPage = totalPages - 1;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // Render halaman pertama
    if (startPage > 0) {
      pages.push(
        <button
          key={0}
          className={`border border-solid border-[#2962ff] h-8 w-8 rounded-md mx-2 flex items-center justify-center font-bold ${
            currentPage === 0
              ? "bg-[#2962ff] text-white"
              : "text-[#2962ff] hover:text-white hover:bg-[#2962ff]"
          }`}
          onClick={() => handleClick(0)}
        >
          1
        </button>
      );
      if (startPage > 1) {
        pages.push(
          <span key="ellipsis-start" className="mx-2">
            ...
          </span>
        );
      }
    }

    // Render halaman tengah
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`border border-solid border-[#2962ff] h-8 w-8 rounded-md mx-2 flex items-center justify-center font-bold ${
            i === currentPage
              ? "bg-[#2962ff] text-white"
              : "text-[#2962ff] hover:text-white hover:bg-[#2962ff]"
          }`}
          onClick={() => handleClick(i)}
        >
          {i + 1}
        </button>
      );
    }

    // Render halaman terakhir
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push(
          <span key="ellipsis-end" className="mx-2">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages - 1}
          className={`border border-solid border-[#2962ff] h-8 w-8 rounded-md mx-2 flex items-center justify-center font-bold ${
            currentPage === totalPages - 1
              ? "bg-[#2962ff] text-white"
              : "text-[#2962ff] hover:text-white hover:bg-[#2962ff]"
          }`}
          onClick={() => handleClick(totalPages - 1)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-8 mb-4">
      {showPrevButton && (
        <button
          className="w-[70px] text-white font-bold h-10 flex items-center justify-center mr-3 bg-[gray] hover:bg-[#2962ff] rounded-md"
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Prev
        </button>
      )}
      {renderPageNumbers()}
      {showNextButton && (
        <button
          className="w-[70px] font-bold text-white h-10 flex items-center justify-center ml-3 bg-[gray] hover:bg-[#2962ff] rounded-md"
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  showPrevButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
};

export default Pagination;
