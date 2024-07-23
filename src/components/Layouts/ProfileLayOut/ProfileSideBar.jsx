
import { FaMinus, FaPlus, FaRegAddressCard } from "react-icons/fa";
import { AiOutlineOrderedList } from "react-icons/ai";
import { LuUserCheck } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../../store/actions/authAct";
import { setOpenSidebar } from "../../../store/slice/component";

const ProfileSideBar = ({ openSide, active }) => {
  const profileMenu = [
    {
      path: "/profile",
      name: "Profile",
      icon: LuUserCheck,
    },
    {
      path: "/profile/orders",
      name: "orders",
      icon: AiOutlineOrderedList,
    },
    {
      path: "/profile/address",
      name: "Address",
      icon: FaRegAddressCard,
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const success = await dispatch(Logout());
    if (success) {
      navigate("/login");
    }
  };

  const handleOpenSidebar = async (boolean) => {
    await dispatch(setOpenSidebar(boolean));
  };
  return (
    <div
      className={`${
        openSide ? "w-[18%]" : "w-[3%]"
      } h-full bg-white transition-all shadow-xl duration-500 ease flex flex-col items-center justify-center relative`}
    >
      {openSide ? (
        <FaMinus
          size={25}
          className={` bg-[#2962ff] text-white p-2 rounded-full cursor-pointer absolute right-2 top-3`}
          onClick={() => handleOpenSidebar(false)}
        />
      ) : (
        <FaPlus
          size={25}
          className={` bg-[#2962ff] text-white p-2  rounded-full cursor-pointer absolute right-2 top-3`}
          onClick={() => handleOpenSidebar(true)}
        />
      )}

      <div
        className={`flex flex-col items-center gap-5 text-[18px] w-full overflow-hidden ${
          openSide ? "px-5" : "px-1"
        }`}
      >
        {profileMenu.map((item, index) => {
          return (
            <li
              key={index}
              className={`${
                active === index + 1 && "bg-[#2962ff] text-white "
              } hover:bg-[#dcf7fa] px-2 py-1 w-full list-none cursor-pointer rounded-lg transition-all duration-500 ease`}
              onClick={() => navigate(item.path)}
            >
              <div
                className={`flex gap-3 items-center ${
                  !openSide && "justify-center"
                }`}
              >
                <item.icon size={20} />{" "}
                <span className={`${!openSide && "hidden"} `}>{item.name}</span>
              </div>
            </li>
          );
        })}
      </div>

      <div
        className="flex overflow-hidden bg-white border border-red-400 w-[90%] cursor-pointer mt-20 p-2 rounded-lg items-center transition-all duration-200 ease"
        onClick={handleLogout}
      >
        <div className="w-full flex">
          <MdOutlineLogout size={20} color="red" />{" "}
          <span className={`${!openSide && "hidden"} text-red-400`}>
            {" "}
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
