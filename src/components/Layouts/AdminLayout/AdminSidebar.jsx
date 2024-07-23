  import { HiOutlineShoppingBag } from "react-icons/hi";
  import { IoHomeOutline } from "react-icons/io5";
  import { AiOutlineUsergroupAdd } from "react-icons/ai";
  import { LiaGiftSolid, LiaSignOutAltSolid } from "react-icons/lia";
  import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { Logout } from "../../../store/actions/authAct";

  const AdminSidebar = () => {
    const location = useLocation();
    const [pathname, setPathname] = useState(location.pathname);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      setPathname(location.pathname);
    }, [pathname]);
    const sideBarData = [
      {
        icon: IoHomeOutline,
        heading: "Dashboard",
        path: "/admin",
      },
      {
        icon: AiOutlineUsergroupAdd,
        heading: "Customers",
        path: "/admin/users-list",
      },
      {
        icon: LiaGiftSolid,
        heading: "Products",
        path: "/admin/products",
      },
    ];
    const handleLogout = async () => {
      await dispatch(Logout());
      navigate('/')
    };

    return (
      <div className="flex flex-col pt-[64px] items-center transition-all duration-500 ease">
        {/* logo */}
        <div
          className={`relative flex items-center gap-[16px] text-[14px] rounded-[12px]
                h-[40px] ml-1 md:pl-[32px] cursor-pointer justify-center transition-all duration-500 ease`}
        >
          <HiOutlineShoppingBag className="text-[40px] md:text-[60px]" />
          <span className="hidden md:block md:text-[30px] font-bold">
            AD
            <span className="text-pink">M</span>
            IN
          </span>
        </div>
        {/* logo */}

        {/* menu */}
        <div className="flex flex-col gap-[32px] mt-[64px]">
          {/* menu-item */}
          {sideBarData.map((item, index) => {
            return (
              <div
                key={index}
                className={`${
                  pathname === item.path && "bg-pink"
                } relative flex items-center gap-[16px] text-[14px] rounded-[12px]
                h-[40px]   px-[10px] cursor-pointer justify-center transition-all duration-500 ease`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="text-[22px] font-extrabold" />
                <span className="hidden md:block">{item.heading}</span>
              </div>
            );
          })}

          
          <div className=" h-[40px] hover:bg-pink rounded-[12px] flex items-center justify-center px-[10px] mt-[50px] cursor-pointer">
            <LiaSignOutAltSolid
              title="Log Out"
              className="text-[22px] font-extrabold"
              onClick={handleLogout}
            />
          </div>
        </div>
        {/* menu */}
      </div>
    );
  };

  export default AdminSidebar;
