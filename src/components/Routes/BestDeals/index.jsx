import { useEffect, useState } from "react";
import styles from "../../../styles/style";
import { productData } from "../../../static/productData";
import ProductCard from "../../ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const d =
      productData &&
      productData.sort((a, b) => {
        b.total_sell - a.total_sell;
      });
    const firstFive = d.slice(0, 5);
    setData(firstFive);
  }, []);

  return (
    <>
      <section className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-2 gap-[20px] md:gap-[25px]  md:grid-cols-2 lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] justify-between border-0 mb-12">
          {data &&
            data.map((item, index) => {
              return <ProductCard productData={item} key={index} />;
            })}
        </div>
      </section>
    </>
  );
};

export default BestDeals;
