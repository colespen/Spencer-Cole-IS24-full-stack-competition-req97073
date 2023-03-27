import { useState } from "react";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import styles from "../styles/Home.module.css";

const ProductForm = ({ saveProducts }) => {
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productOwnerName: "",
    Developers: "",
    scrumMasterName: "",
    startDate: "",
    methodology: "",
  });
  console.log("product: ", newProduct)
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setNewProduct(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newProduct.productName ||
      !newProduct.productOwnerName ||
      !newProduct.developers ||
      !newProduct.scrumMasterName ||
      !newProduct.startDate ||
      !newProduct.methodology
    ) {
      setErrorMessage("Please fill out all fields.");
      return;
    }
    saveProducts(newProduct);
    setNewProduct({
      productName: "",
      productOwnerName: "",
      developers: "",
      scrumMasterName: "",
      startDate: "",
      methodology: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Product Name:<br />
        <input
          name="productName"
          value={newProduct.productName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Product Owner Name:<br />
        <input
          name="productOwnerName"
          value={newProduct.productOwnerName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Developers:<br />
        <input
          name="Developers"
          value={newProduct.developers}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Scrum Master Name:<br />
        <input
          name="scrumMasterName"
          value={newProduct.scrumMasterName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Start Date:<br />
        <input
          name="startDate"
          value={newProduct.startDate}
          onChange={handleChange}
          type="date"
          required
        />
      </label>
      <label>
        Methodology:<br />
        <input
          name="methodology"
          value={newProduct.methodology}
          onChange={handleChange}
          required
        />
      </label>
      <div className={styles.nav}>
      <button id="submit-btn" type="submit" data-tip data-for="submit-tooltip">
        Add Product
      </button>
      <Tooltip id="submit-tooltip" place="top" type="error" effect="solid" />
      <button type="reset">Reset</button>
      </div>
    </form>
  );
};

export default ProductForm;

{/* <button id="submit-btn" type="submit" data-tip data-for="submit-tooltip">
Add Product
</button>
<Tooltip id="submit-tooltip" place="top" type="error" effect="solid" /> */}


// import styles from "../styles/Home.module.css";

// const Form = ({ saveProducts }) => {

//   // const handleChange = (e) => {
//   //   setNewProduct({
//   //     productName: e.target.value,
//   //   });
//   // };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   const form = e.target;
//   const formData = new FormData(form);
//   const dataObject = Object.fromEntries(formData.entries());
//   console.log("dataObject: ", dataObject);
//   saveProducts(dataObject);
// };

//   return (
//     <form onSubmit={handleSubmit} className={styles.form}>
//       <label>
//         Product Name:<br />
//         <input name="productName" />
//       </label>
//       <label>
//         Product Owner Name:<br />
//         <input name="productOwnerName" />
//       </label>
//       <label>
//         Developers:<br />
//         <input name="Developers" />
//       </label>
//       <label>
//         Scrum Master Name:<br />
//         <input name="scrumMasterName" />
//       </label>
//       <label>
//         Start Date:<br />
//         <input name="startDate" placeholder="YYYY/MM/DD" />
//       </label>
//       <label>
//         Methodology:<br />
//         <input name="methodology" />
//       </label>
//       <div className={styles.nav}>
//         <button type="submit">Add Product</button>
//         <button type="reset">Reset</button>
//       </div>
//     </form>
//   );
// };

// export default Form;