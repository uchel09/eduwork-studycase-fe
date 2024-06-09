import { useEffect, useState } from "react";
import HeaderC from "../components/Layouts/HeaderC";
import styles from "../styles/style";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/productData";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Layouts/Footer";

const ProductPage = () => {
  const [data, setData] = useState();
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  useEffect(() => {
    if (categoryData == null) {
      const d =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
    } else {
      const d =
        productData && productData.filter((i) => i.category === categoryData);
      setData(d);
    }
    // window.scrollTo(0,0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <HeaderC activeHeading={3} />
      <br />
      <br />
      <section className={`${styles.section}`}>
        <div className="grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((item, index) => {
              return <ProductCard productData={item} key={index} />;
            })}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </section>
      <Footer />
    </div>
  );
};

export default ProductPage;
