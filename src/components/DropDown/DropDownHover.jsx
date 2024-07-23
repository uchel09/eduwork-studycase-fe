const DropDownCategory = ({ children, title }) => {
  return (
    <div className=" inline-block text-left group">
      <button
        id="dropdownHoverButton"
        className="text-white bg-[#2962ff] py-1 px-2 rounded-lg"
        type="button"
      >
        {title}
      </button>

      {/* Dropdown menu */}
      <div
        id="dropdownHover"
        className={`absolute top-10 px-10 left-0 right-0   rounded-lg mx-auto bg-white shadow-lg 
          max-h-0 opacity-0 group-hover:max-h-[40vh] group-hover:opacity-100 group-hover:animate-curtainOpen
          overflow-y-auto transition-all duration-300 ease-in-out`}
      >
        {/* Konten dropdown */}
        
        <h1 className="my-6 text-xl font-[500] ">Filter {title}</h1>
        <div className="flex my-6 flex-wrap gap-6">{children}</div>
      </div>
    </div>
  );
};

export default DropDownCategory;
