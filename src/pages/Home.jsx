import HeaderC from "../components/Layouts/HeaderC";

import BestDeals from "../components/Routes/BestDeals";
import FeaturedProduct from "../components/Routes/FeaturedProduct";
import Events from "../components/Routes/Events";
import Sponsored from "../components/Routes/Sponsored";
import Footer from "../components/Layouts/Footer";
import Slider2 from "../components/Routes/slider";
import styles from "../styles/style";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <HeaderC />
      <section className={`${styles.section} h-10 flex`}>
        <div></div>
        <Link to="/products?skip=0">
          <button className="px-5 bg-[#2962ff] text-white py-2 rounded-lg mt-8">
            Mulai Berbelanja
          </button>
        </Link>
      </section>
      <Slider2 />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
}

export default HomePage;
