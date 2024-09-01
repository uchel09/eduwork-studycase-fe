

import ProfileSideBar from "./ProfileSideBar";
import HeaderC from "../HeaderC";
import { shallowEqual, useSelector } from "react-redux";


const ProfileLayout = ({ children, active }) => {


  const { openSidebar } = useSelector((state) => state.component, shallowEqual);


  return (
    <div className="felx flex-col">
      <HeaderC />
      <div className="w-full h-[90vh] flex bg-white ">
        {/* SideBar */}
        <ProfileSideBar openSide={openSidebar} active={active} />

        {/* Right Session  */}
        <div
          className={`${
            openSidebar ? "w-[82%]" : "w-[97%]"
          } h-full flex flex-col bg-white pl-[20px] transition-all duration-500 ease`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
