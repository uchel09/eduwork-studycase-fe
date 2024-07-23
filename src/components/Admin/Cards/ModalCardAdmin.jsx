import Charts from "react-apexcharts";
import { motion } from "framer-motion";
const ModalCardAdmin = ({ series, color, setOpenCardModal, title }) => {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2024-04-19T00:00:00.000Z",
          "2024-04-19T01:00:00.000Z",
          "2024-04-19T02:00:00.000Z",
          "2024-04-19T03:00:00.000Z",
          "2024-04-19T04:00:00.000Z",
          "2024-04-19T05:00:00.000Z",
          "2024-04-19T06:00:00.000Z",
        ],
      },
    },
  };

  return (
    <div className="bg-[#f5a82733] absolute left-0 right-0 top-0 bottom-0">
      <motion.div
        initial={{ opacity: 0, y: -50, x: -50 }} // Atur posisi awal dan opasitas
        animate={{ opacity: 1, y: 0 }} // Atur posisi akhir dan opasitas saat komponen dimount
        exit={{ opacity: 0, y: -50 }} // Atur posisi dan opasitas saat komponen di-unmount
        transition={{ duration: 0.5 }}
        style={{ background: color.backGround }}
        className={`absolute bg-white flex flex-col w-[60%] h-[70vh] z-[9] top-[15vh] left-[20%] 
      rounded-[16px] items-center justify-between p-[1rem]
      `}
        layoutId="expandableCard"
      >
        <div
          className="cursor-pointer absolute left-3 top-2 z-[10] px-2 bg-red-300 text-white text-[20px]  rounded-full"
          onClick={() => setOpenCardModal(false)}
        >
          close
        </div>

        <div className="relative w-[80%] h-[80%]">
          <Charts series={series} type="area" options={data.options} />
        </div>
        <span className="text-[32px] text-white font-bold">  {title}</span>
      </motion.div>
    </div>
  );
};

export default ModalCardAdmin;
