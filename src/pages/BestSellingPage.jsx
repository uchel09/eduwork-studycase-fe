import { useEffect, useState } from "react";
import HeaderC from "../components/Layouts/HeaderC";
import styles from "../styles/style";

import { productData } from "../static/productData";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Layouts/Footer";

const BestSellingPage = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(d);
  }, []);

  return (
    <div>
      <HeaderC activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((item, index) => {
              return <ProductCard productData={item} key={index} />;
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingPage;
