import { IoSearch } from "react-icons/io5";
import AdminLayout from "../../components/Layouts/AdminLayout";

import { useEffect, useState } from "react";
import ModalCreateProduct from "../../components/Admin/Modal/ModalCreateProduct";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import DeleteModal from "../../components/Modal/deleteModal";
import { deleteDataAPI } from "../../utils/fetchApi";
import { toast } from "react-toastify";
import { getProductsTest } from "../../store/actions/productAct";

const ProductsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProductsTest({ tags: [], category: [], skip: 0, limit: 15, q: "" })
    );
  }, []);

  const { token } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);
  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState("");
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteProduct = async () => {
    console.log(token);
    try {
      const res = await deleteDataAPI(`products/${deleteId}`, token);
      console.log(res.data);
      toast.success(res.data.message);
      setOpenDelete(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      getProductsTest({ tags: [], category: [], skip: 0, limit: 15, q: search })
    );
  };

  return (
    <AdminLayout>
      <form
        onSubmit={onSubmit}
        className="w-full flex gap-[10px]  md:flex-row   relative"
      >
        <div className="w-full md:w-[60%] relative">
          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-[40px] w-full px-2 border-black border-[2px] rounded-md"
          />
          <IoSearch
            size={30}
            className="absolute right-2 top-1.5 cursor-pointer"
          />
        </div>
        <button
          type="submit"
          className="px-5  flex items-center justify-center bg-green-400 rounded-[10px]"
        >
          <span className="my-[10px] md:my-[0px]">Search</span>
        </button>
      </form>

      <button
        onClick={() => setOpenCreateProduct(true)}
        className="w-[70%] mt-4 md:w-[30%] flex items-center py-2 justify-center bg-green-400 rounded-[10px]"
      >
        Create New Product
      </button>
      <div className="flex flex-col w-full h-[85vh] overflow-auto">
        <div className=" flex flex-wrap gap-[20px]   my-10">
          {products &&
            products.length > 0 &&
            products.map((product, index) => {
              return (
                <ProductCard
                  key={index}
                  product={product}
                  admin={true}
                  setOpenDelete={setOpenDelete}
                  setDeleteId={setDeleteId}
                />
              );
            })}
        </div>
      </div>
      {/*   search box  */}
      {openCreateProduct && (
        <ModalCreateProduct setOpenCreateProduct={setOpenCreateProduct} />
      )}
      {openDelete && (
        <DeleteModal
          setOpenDelete={setOpenDelete}
          text="Apakah kamu yakin untuk menghapus product ini ?"
          handleDelete={handleDeleteProduct}
        />
      )}
    </AdminLayout>
  );
};

export default ProductsPage;
