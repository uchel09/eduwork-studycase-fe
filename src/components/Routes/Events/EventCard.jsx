import styles from "../../../styles/style";
import CountDown from "./CountDown";

const EventCard = ({ active }) => {
  return (
    <div
      className={`w-full block bg-white rounded-lg lg:flex  px-2 pt-2 pb-6 ${
        active ? "unset" : "mb-12"
      } `}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src="https://cdn.eraspace.com/media/catalog/product/m/a/macbook_pro_16_inci_m2_2023_space_grey_1.jpg"
          alt=""
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={styles.productTitle}>
          MacBook pro M2 chipset 256gb ssd 8gb ram space-gray color with apple 1
          year warranty
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis nihil
          nulla tempore, culpa porro, iusto inventore, pariatur harum ratione
          voluptatum perspiciatis. Amet cupiditate nihil tempora blanditiis quia
          omnis labore earum?
        </p>
        <div className="flex justify-between py-2">
          <div className="flex">
            <h5 className="font-[500] text-[16px] text-[#d55b45] pr-3 line-through">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(16913610)}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto ">
              16144110
            </h5>
          </div>
          <span className="font-bold text-green-400 text-[14px] mr-3">
            (120 sold)
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
