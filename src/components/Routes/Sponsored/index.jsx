import styles from "../../../styles/style";

const Sponsored = () => {
  return (
    <section
      className={`${styles.section} mb-12 hidden sm:block bg-white px-5 py-2 cursor-pointer rounded-xl`}
    >
      <div className="flex items-center justify-between">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFotWSsiDw-Hl1PsPXOb5jmK0-OT_M3FA-jpphFG9dA&s"
          alt=""
          style={{ width: "150px", objectFit: "contain" }}
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVByitatwVy2dZAVZOj2VNNhuoWzNrRZbBOfORmn5nzg&s"
          alt=""
          style={{ width: "150px", objectFit: "contain" }}
        />
        <img
          src="https://www.hatchwise.com/wp-content/uploads/2022/10/image-9.png"
          alt=""
          style={{ width: "150px", objectFit: "contain" }}
        />

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ_rQzz9iSSNolGzuNtfcLk3VQB0cEUTcvQetJ1LE8Gw&s"
          alt=""
          style={{ width: "150px", objectFit: "contain" }}
        />

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAMaTAJe6WddOjadJBnxzHdSVt_UMReBj3-JhVnpGfgQ&s"
          alt=""
          style={{ width: "150px", objectFit: "contain" }}
        />
      </div>
    </section>
  );
};

export default Sponsored;
