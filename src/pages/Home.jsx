import HeaderC from "../components/Layouts/HeaderC";
import Hero from "../components/Routes/Hero";
import Categories from "../components/Routes/Categories";
import BestDeals from "../components/Routes/BestDeals";
import FeaturedProduct from "../components/Routes/FeaturedProduct";
import Events from "../components/Routes/Events";
import Sponsored from "../components/Routes/Sponsored";
import Footer from "../components/Layouts/Footer";

function HomePage() {
  return (
    <div>
      <HeaderC activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
}

export default HomePage;
