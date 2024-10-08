import { eventPhoto } from "../../../assets";
import styles from "../../../styles/style";
import CountDown from "./CountDown";

const EventCard = ({ active }) => {
  return (
    <div
      className={`w-full flex justify-between bg-white gap-10 rounded-lg lg:flex  px-2 pt-2 pb-6 ${
        active ? "unset" : "mb-12"
      } `}
    >
      <div className="w-[100px] lg:w-[530px] items-center flex justify-center m-auto bg-white shadow-lg p-4 rounded-xl">
        <img src={eventPhoto} alt="event" className="w-[500px] rouded-xl" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={styles.productTitle}>
          KREMLIN Bomber Jacket Space Putih
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
              }).format(125000)}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto ">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(50000)}
            </h5>
          </div>
          <span className="font-bold text-green-400 text-[14px] mr-3">
            (120 terjual)
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
