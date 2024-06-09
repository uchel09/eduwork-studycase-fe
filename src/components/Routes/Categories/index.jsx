import { useNavigate } from "react-router-dom";
import { brandingData } from "../../../static/brandingData.js";
import { categoriesData } from "../../../static/productData.js";
import styles from "../../../styles/style";

const Categories = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  return (
    <>
      <section className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-5 flex justify-between w-full shadow-sm bg-white p-5 rounded-md }`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                <img
                  src={i.icon}
                  className="w-10 h-12"
                  style={{ fill: "yellow" }}
                  alt=""
                />
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base text-yellow-600">
                    {i.title}
                  </h3>
                  <p className="text-xs md:text-sm text-yellow-600">
                    {i.Description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>
      {/* categories  */}
      <section
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:gap-[10px]  md:grid-cols-2 lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((item, index) => {
              const handleSubmit = (item) => {
                navigate(`/products?category=(${item.title})`);
                window.localStorage;
              };
              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                  key={index}
                  onClick={() => handleSubmit(item)}
                >
                  <h5 className="text-[18px] leading-[1.3]">{item.title}</h5>
                  <img
                    src={item.image_Url}
                    className="w-[120px] object-cover"
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Categories;
