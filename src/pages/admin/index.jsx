import CardsData from "../../components/Admin/Cards/CardsData";
import AdminLayout from "../../components/Layouts/AdminLayout";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsSave } from "react-icons/bs";
import { LuFileOutput } from "react-icons/lu";
import { useState } from "react";
import ModalCardAdmin from "../../components/Admin/Cards/ModalCardAdmin";
const AdminPage = () => {
  const cardsData = [
    {
      title: "Sales",
      color: {
        backGround: "linear-gradient(180deg, #ff5724 0%, #f53d59 100%",
        boxShadow: "shadow-custom-card-1",
      },
      barValue: 70,
      value: "25,970",
      icon: RiMoneyDollarCircleLine,
      series: [
        {
          name: "Sales",
          data: [31, 40, 28, 51, 41, 100, 42, 109],
        },
      ],
    },
    {
      title: "Revenue",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #ff919d 100%",
        boxShadow: "shadow-custom-card-2",
      },
      barValue: 70,
      value: "25,970",
      icon: BsSave,
      series: [
        {
          name: "Revenue",
          data: [10, 100, 50, 70, 80, 30, 40],
        },
      ],
    },
    {
      title: "Expenses",
      color: {
        backGround: "linear-gradient(180deg, #ffa938 0%, #f5b23d 100%",
        boxShadow: "shadow-custom-card-3",
      },
      barValue: 60,
      value: "4,270",
      icon: LuFileOutput,
      series: [
        {
          name: "Expenses",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
  ];

  const [data, setData] = useState({});
  const [openCardModal, setOpenCardModal] = useState(false);
  const openModal = (series, color,title) => {
    setOpenCardModal(true);
    setData({ series, color, title });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col w-full">
        <div className="w-full flex  gap-[40px]">
          {cardsData.map((card, index) => {
            return (
              <div key={index} className="w-full">
                <CardsData
                  title={card.title}
                  color={card.color}
                  barValue={card.barValue}
                  value={card.value}
                  icon={card.icon}
                  onClick={() => openModal(card.series, card.color, card.title)}
                />
              </div>
            );
          })}
        </div>
        {openCardModal && (
          <ModalCardAdmin
            series={data?.series}
            color={data?.color}
            title={data?.title}
            setOpenCardModal={setOpenCardModal}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
