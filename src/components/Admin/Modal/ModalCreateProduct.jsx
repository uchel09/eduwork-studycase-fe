import { motion } from "framer-motion";
import { GrGallery } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import OtherInput from "../../MyInput/OtherInput";
import { useEffect, useState } from "react";
import Select from "react-select";
import { getDataAPINT } from "../../../utils/fetchApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../store/actions/productAct";

const ModalCreateProduct = ({ setOpenCreateProduct }) => {
  const dispatch = useDispatch();
  // const { products } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);
  const [tagOptions, setTagOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const getTagsAndCategories = async () => {
      try {
        // data tags
        const tagsRes = await getDataAPINT("tags");
        if (tagsRes.data && tagsRes.data.tags && tagsRes.data.tags.length > 0) {
          const formattedTags = tagsRes.data.tags.map((item) => ({
            value: item.name,
            label: item.name,
          }));

          setTagOptions(formattedTags);
        }

        // data category
        const categoriesRes = await getDataAPINT("categories");
        if (
          categoriesRes.data &&
          categoriesRes.data.categories &&
          categoriesRes.data.categories.length > 0
        ) {
          const formattedCategories = categoriesRes.data.categories.map(
            (item) => ({
              value: item.name,
              label: item.name,
            })
          );

          setCategoryOptions(formattedCategories);
        }
      } catch (error) {
        toast.error("gagal mendapatkan data tag dan category  ");
      }
      setTagOptions;
    };
    getTagsAndCategories();
  }, []);

  const initialFormState = {
    name: "",
    description: "",
    price: "",
    images: [],
    imagePreviews: [],
    colors: [],
    sizes: [],
    category: "",
    tags: [],
  };
  const [productForm, setProductForm] = useState(initialFormState);

  //untuk variants colors dan sizes
  const handleArrayChange = (e, key) => {
    const { value } = e.target;
    setProductForm({
      ...productForm,
      [key]: value.split(",").map((item) => item.trim()),
    });
  };

  // option select untuk category dan tags
  const handleCategoryChange = (selectedOption) => {
    setProductForm({ ...productForm, category: selectedOption.value });
  };

  const handleArrayTags = (selectedOptions) => {
    setProductForm({
      ...productForm,
      tags: selectedOptions.map((option) => option.value),
    });
  };

  //untuk images
  const handleChangeImage = (e) => {
    const files = [...e.target.files];
    let newImages = [];
    let err = "";
    files.forEach((file) => {
      if (!file) return (err = "File doesn't exist");
      if (file.size > 1024 * 1024 * 6) {
        return (err = "Image format incorrect or file size more than 6 mb");
      }
      return newImages.push(file);
    });

    if (err) {
      toast.error(err);
      return;
    }
    setProductForm((prevForm) => ({
      ...prevForm,
      images: [...prevForm.images, ...newImages],
    }));
  };
  const deleteImage = (index) => {
    const newArr = [...productForm.images];
    newArr.splice(index, 1);
    setProductForm({ ...productForm, images: newArr });
  };

  // untuk delete last index di variants colors dan sizes
  const deleteLastElement = (key) => {
    setProductForm((prevForm) => ({
      ...prevForm,
      [key]: prevForm[key].slice(0, -1),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("description", productForm.description);
    formData.append("price", productForm.price);
    formData.append("category", productForm.category);

    productForm.colors.forEach((color, index) => {
      formData.append(`colors[${index}]`, color);
    });

    productForm.sizes.forEach((size, index) => {
      formData.append(`sizes[${index}]`, size);
    });

    productForm.tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    Array.from(productForm.images).forEach((file) => {
      formData.append("images", file);
    });
    dispatch(createProduct({ formData, token }));
    setProductForm(initialFormState);
  };

  return (
    <div className="bg-[#f5a82733] absolute left-0 right-0 top-0 bottom-0">
      <motion.div
        initial={{ opacity: 0, y: -50, x: -50 }} // Atur posisi awal dan opasitas
        animate={{ opacity: 1, y: 0 }} // Atur posisi akhir dan opasitas saat komponen dimount
        exit={{ opacity: 0, y: -50 }} // Atur posisi dan opasitas saat komponen di-unmount
        transition={{ duration: 0.5 }}
        className={`absolute bg-white flex flex-col w-[90%] h-[90vh] z-[9] top-[5vh] left-[10%] 
      rounded-[16px] items-center justify-between p-[1rem]
      `}
      >
        <div
          className="cursor-pointer absolute -left-3 -top-3 z-[10] px-2 bg-red-300 hover:bg-red-400 text-white text-[20px]  rounded-full"
          onClick={() => setOpenCreateProduct(false)}
        >
          close
        </div>
        <form
          className="flex flex-col  w-full h-full  gap-[20px] py-[20px] px-1 overflow-auto"
          onSubmit={handleSubmit}
        >
          <div className=" w-full  flex gap-[15px]">
            <div className="flex flex-col w-[50%] h-full gap-[15px]">
              <OtherInput
                label="Product Name :"
                name={productForm.name}
                value={productForm.name}
                onChange={(e) =>
                  setProductForm({ ...productForm, name: e.target.value })
                }
              />
              <OtherInput
                label="Price :"
                name={productForm.price}
                value={productForm.price}
                onChange={(e) =>
                  setProductForm({ ...productForm, price: e.target.value })
                }
              />
              <div className="w-full flex flex-col">
                <OtherInput
                  label="Colors :"
                  name={productForm.colors}
                  value={productForm.colors.join(", ")}
                  onChange={(e) => handleArrayChange(e, "colors")}
                  suffix={
                    productForm.colors.length > 0 && (
                      <FaRegTrashAlt
                        className="text-[18px] text-red-400 cursor-pointer"
                        onClick={() => deleteLastElement("colors")}
                      />
                    )
                  }
                />
                <div className="w-full flex gap-2">
                  {productForm.colors.map((item, index) => {
                    return (
                      <span
                        className="px-2 py-1 bg-slate-300 mt-2 text-white font-bold rounded-[10px]"
                        key={index}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="w-full flex flex-col">
                <OtherInput
                  label="Sizes :"
                  name={productForm.sizes}
                  value={productForm.sizes.join(", ")}
                  onChange={(e) => handleArrayChange(e, "sizes")}
                  suffix={
                    productForm.sizes.length > 0 && (
                      <FaRegTrashAlt
                        className="text-[18px] text-red-400 cursor-pointer"
                        onClick={() => deleteLastElement("sizes")}
                      />
                    )
                  }
                />
                <div className="w-full flex gap-2">
                  {productForm.sizes.map((item, index) => {
                    return (
                      <span
                        className="px-2 py-1 bg-slate-300 mt-2 text-white font-bold rounded-[10px]"
                        key={index}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Category Options  */}
              <div>
                <label className="block text-sm  text-gray-700 font-bold">
                  Category:
                </label>
                <Select
                  className="mt-1 block w-full border border-slate-400  rounded"
                  options={categoryOptions}
                  onChange={handleCategoryChange}
                />
              </div>
              {/* Tags Options  */}
              <div>
                <label className="block text-sm  text-gray-700 font-bold">
                  Tags:
                </label>
                <Select
                  options={tagOptions}
                  isMulti
                  onChange={handleArrayTags}
                  className="mt-1 block w-full border border-slate-400  rounded"
                />
              </div>
            </div>
            {/* right section  */}

            <div className="flex flex-col w-[50%] h-full gap-[20px]">
              <label>Description:</label>
              <textarea
                className="h-[40%] border w-full p-3 rounded-[15px]"
                name="description"
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description: e.target.value,
                  })
                }
              ></textarea>

              <div className="overflow-hidden relative bg-white border w-[30px] h-[30px] flex items-center justify-center">
                <GrGallery size={23} className="cursor-pointer" />
                <input
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleChangeImage}
                  className="absolute top-0 left-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex flex-wrap gap-[10px] h-[50%] overflow-auto py-10">
                {productForm.images.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="relative w-[140px] h-[157px] flex items-center justify-center  bg-pink "
                    >
                      <img
                        className="w-[135px] h-[150px] object-cover"
                        src={URL.createObjectURL(item)}
                      />
                      <IoMdCloseCircle
                        size={20}
                        className="absolute -right-2 -top-2 cursor-pointer "
                        color="red"
                        onClick={() => deleteImage(index)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 py-[10px] rounded-[10px]"
          >
            {" "}
            Create{" "}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ModalCreateProduct;
