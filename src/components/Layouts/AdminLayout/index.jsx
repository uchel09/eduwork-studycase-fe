import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
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
