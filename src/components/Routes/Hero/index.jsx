import { Link } from "react-router-dom";
import styles from "../../../styles/style";
import { DashboardPhotos } from "../../../assets";

const Hero = () => {
  return (
    <div
      style={{ backgroundImage: `url(${DashboardPhotos})` }}
      className={`relative min-h-[70vh]  800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}  800px:bg-normal bg-cover`}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`} >
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-white font-[600] capitalize`}
        >
          Best Collection for <br /> Your Daily Fashion
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
