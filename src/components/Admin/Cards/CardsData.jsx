import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CardsData = ({ icon, color, barValue, title, value, onClick }) => {
  const Icon = icon;
  return (
    <div
      style={{
        background: color.backGround,
      }}
      className={`flex py-2 px-4 gap-[10px] h-[140px] rounded-[16px] text-white relative 
      cursor-pointer hover:shadow-none  ${color.boxShadow}`}
      onClick={onClick}
    >
      {/* Radial Bar  */}
      <div className="flex flex-col flex-1  items-center">
        <CircularProgressbar
          value={barValue}
          text={`${barValue}%`}
          styles={buildStyles({
            pathColor: "white",
            trailColor: "transparent",
            textColor: "white",
            pathTransitionDuration: 0.5,
            pathTransition: "none",
          })}
          className="custom-progress-bar" // use custom class for drop shadow
        />
        <span className="text-[25px] font-bold">{title}</span>
      </div>
      {/* Detail  */}
      <div className="flex flex-col h-[100%] justify-between">
        <Icon className="text-[30px]" />
        <span className="text-[18px]">{value}</span>
        <span className="text-[12px]">Last 24 hours</span>
      </div>
    </div>
  );
};

export default CardsData;
