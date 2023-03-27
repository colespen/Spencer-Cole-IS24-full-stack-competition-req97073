import { useState } from "react";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import styles from "../styles/Home.module.css";

const ProductForm = ({ saveProducts }) => {
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productOwnerName: "",
    Developers: [],
    scrumMasterName: "",
    startDate: "",
    methodology: "",
  });
  console.log("newProduct.startDate: ", newProduct.startDate);
  const [errorMessage, setErrorMessage] = useState("");


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // change date format to `YYYY/MM/DD`
    const newVal =
      name === "startDate" ? value.replace(/-/g, "/") : value;
    // set array of strings if Developers
    setNewProduct(prev => ({
      ...prev,
      [name]: name === "Developers" ? [newVal] : newVal,
    }));

  };

  // max 5 dev's
  const handleAddDeveloper = () => {
    if (newProduct.Developers.length < 5) {
      setNewProduct(prev => ({
        ...prev,
        Developers: [...prev.Developers, ""],
      }));
    }
  };
  // remove dev
  const handleRemoveDeveloper = (index) => {
    setNewProduct(prev => ({
      ...prev,
      Developers: prev.Developers.filter((_, i) => i !== index),
    }));
  };

  const handleDeveloperChange = (index, value) => {
    setNewProduct(prev => {
      const newDevelopers = [...prev.Developers];
      newDevelopers[index] = value;
      return {
        ...prev,
        Developers: newDevelopers,
      };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // check for empty fields and trigger Tooltip on submit
    if (
      !newProduct.productName ||
      !newProduct.productOwnerName ||
      newProduct.Developers.some((d) => !d) ||
      !newProduct.scrumMasterName ||
      !newProduct.startDate ||
      !newProduct.methodology
    ) {
      setErrorMessage("Please fill out all fields.");
      return;
    } else {
      saveProducts(newProduct);
      setNewProduct({
        productName: "",
        productOwnerName: "",
        Developers: [],
        scrumMasterName: "",
        startDate: "",
        methodology: "",
      });
    }
  };

  const handleReset = (e) => {
    if (e.target.type === "reset") {
      setNewProduct({
        productName: "",
        productOwnerName: "",
        Developers: [],
        scrumMasterName: "",
        startDate: "",
        methodology: "",
      });
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className={styles.form}>
      <label>
        Product Name:<br />
        <input
          name="productName"
          value={newProduct.productName}
          onChange={handleOnChange}
          required
        />
      </label>
      <label>
        Product Owner Name:<br />
        <input
          name="productOwnerName"
          value={newProduct.productOwnerName}
          onChange={handleOnChange}
          required
        />
      </label>
      <label style={{ "height": "30px" }}>
        Developers
      </label>
      {newProduct.Developers.map((developer, index) => (
        <div key={index}>
          <small>
            Developer {index + 1}:<br />
            <input
              name="Developers"
              value={developer}
              onChange={(e) => handleDeveloperChange(index, e.target.value)}
              required
            />
          </small>
          {newProduct.Developers.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveDeveloper(index)}
            >
              Remove Developer
            </button>
          )}
        </div>
      ))}
      {newProduct.Developers.length < 5 && (
        <button type="button" onClick={handleAddDeveloper}>
          Add Developer
        </button>
      )}
      <label>
        Scrum Master Name:<br />
        <input
          name="scrumMasterName"
          value={newProduct.scrumMasterName}
          onChange={handleOnChange}
          required
        />
      </label>
      <label>
        Start Date:<br />
        <input
          name="startDate"
          value={newProduct.startDate.replace(/\//g, "-")}
          onChange={handleOnChange}
          type="date"
          required
        />
      </label>
      <label>
        Methodology:<br />
        <input
          name="methodology"
          value={newProduct.methodology}
          onChange={handleOnChange}
          required
        />
      </label>
      <div className={styles.nav}>
        <button id="submit-btn" type="submit" data-tip data-for="submit-tooltip">
          Add Product
        </button>
        <Tooltip id="submit-tooltip" place="top" type="error" effect="solid" />
        <button type="reset" onClick={handleReset}>Reset</button>
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