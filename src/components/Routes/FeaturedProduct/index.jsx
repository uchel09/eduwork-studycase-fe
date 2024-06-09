import styles from "../../../styles/style";
import ProductCard from "../../ProductCard";
import { productData } from "../../../static/productData";

const FeaturedProduct = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Featured Product</h1>
      </div>
      <div className="grid grid-cols-2 gap-[20px] md:gap-[25px]  md:grid-cols-2 lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] justify-between border-0 mb-12">
        {productData &&
          productData.map((item, index) => {
            return <ProductCard productData={item} key={index} />;
          })}
      </div>
    </section>
  );
};

export default FeaturedProduct;
