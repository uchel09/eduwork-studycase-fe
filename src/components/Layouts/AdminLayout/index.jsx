import { shallowEqual, useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const navigate = useNavigate()
useEffect(()=>{
  if(user?.role !== "admin"){
    navigate("/")
  }
},[user])
  console.log(user)
  return (
    <div className="bg-app-gradient flex w-full items-center justify-center min-h-screen">
      {/* App Glass  */}
      <div
        className={`grid h-[97vh] w-[97%] rounded-[32px] bg-glass overflow-hidden grid-cols-custom1 md:grid-cols-custom `}
      >
        <AdminSidebar />
        <div className="px-[50px] py-[40px]">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
