import { postDataAPI } from "../../utils/fetchApi";
import Select from "react-select";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "../../styles/style";
import { toast } from "react-toastify";


const CreateAddressModal = () => {
    const { token } = useSelector((state) => state.auth);
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

  // form State
  const initialAddressFormState = {
    name: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
    phone_number: "",
    detail: "",
  };
  const [addressForm, setAddressForm] = useState(initialAddressFormState);

  //Provinsi
  useEffect(() => {
    const getProvinsi = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/proxy/provinsi"
      );

      if (res.data && res.data.length > 0) {
        const formattedProvinsi = res.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));

        setProvinsi(formattedProvinsi);
      }
    };
    getProvinsi();
  }, []);

  // get kabupaten jika sudah memilih provinsi
  const handleProvinsiChange = async (selectedOption) => {
    setAddressForm({ ...addressForm, provinsi: selectedOption.label });
    const res = await axios.get(
      `http://localhost:8000/api/v1/proxy/kabupaten/${selectedOption.value}`
    );

    if (res.data && res.data.length > 0) {
      const formattedKabupaten = res.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      setKabupaten(formattedKabupaten);
    } else {
      setKabupaten([]);
    }
  };

  // get kecamatan jika sudah memilih kabupaten
  const handleKabupatenChange = async (selectedOption) => {
    setAddressForm({ ...addressForm, kabupaten: selectedOption.label });
    const res = await axios.get(
      `http://localhost:8000/api/v1/proxy/kecamatan/${selectedOption.value}`
    );

    if (res.data && res.data.length > 0) {
      const formattedKecamatan = res.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      setKecamatan(formattedKecamatan);
    } else {
      setKecamatan([]);
    }
  };

  // get kelurahan jika sudah memilih kecamatan
  const handleKecamatanChange = async (selectedOption) => {
    setAddressForm({ ...addressForm, kecamatan: selectedOption.label });

    const res = await axios.get(
      `http://localhost:8000/api/v1/proxy/kelurahan/${selectedOption.value}`
    );

    if (res.data && res.data.length > 0) {
      const formattedKelurahan = res.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      setKelurahan(formattedKelurahan);
    } else {
      setKelurahan([]);
    }
  };

  const createAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await postDataAPI("delivery-addresses", addressForm, token);
      if (res.data.success === true) {
        toast.success("create alamat berhasil");
        setAddressForm(initialAddressFormState);
      } else {
        toast.error("gagal membuat alamat");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={createAddress} className=" flex flex-col w-[92%] mx-auto">
      <div className="w-full gap-4 flex h-full">
        {/* left  */}
        <div className="w-[50%] flex flex-col gap-3 h-full ">
          <label htmlFor="">Nama :</label>
          <div className={`${styles.containerStyle} h-[45px] w-full`}>
            <input
              type="text"
              className={`${styles.inputStyle}`}
              placeholder="Name..."
              value={addressForm.name}
              onChange={(e) =>
                setAddressForm({ ...addressForm, name: e.target.value })
              }
            />
          </div>
          <label htmlFor="">Phone :</label>
          <div className={`${styles.containerStyle} h-[45px] w-full`}>
            <input
              type="text"
              className={`${styles.inputStyle}`}
              placeholder="Name..."
              value={addressForm.phone_number}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  phone_number: e.target.value,
                })
              }
            />
          </div>
          <label>Detail :</label>
          <textarea
            className="h-[30vh] border w-full p-3 rounded-[15px]"
            name="description"
            value={addressForm.detail}
            onChange={(e) =>
              setAddressForm({ ...addressForm, detail: e.target.value })
            }
          ></textarea>
        </div>
        {/* Right  */}
        <div className="w-[50%] gap-3 h-full flex flex-col">
          <label htmlFor="">Provinsi :</label>
          <Select
            className="mt-1 block w-full border border-slate-400  rounded"
            options={provinsi}
            onChange={handleProvinsiChange}
          />
          <label htmlFor="">Kabupaten/Kota :</label>
          <Select
            className="mt-1 block w-full border border-slate-400  rounded"
            options={kabupaten}
            onChange={handleKabupatenChange}
          />
          <label htmlFor="">Kecamatan :</label>
          <Select
            className="mt-1 block w-full border border-slate-400  rounded"
            options={kecamatan}
            onChange={handleKecamatanChange}
          />
          <label htmlFor="">Kelurahan :</label>
          <Select
            className="mt-1 block w-full border border-slate-400  rounded"
            options={kelurahan}
            onChange={(selectedOption) =>
              setAddressForm({
                ...addressForm,
                kelurahan: selectedOption.label,
              })
            }
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-400 w-full py-2 rounded-lg mt-4"
      >
        CREATE
      </button>
    </form>
  );
};

export default CreateAddressModal;
