import { useState } from "react";
import { Tooltip } from "react-tooltip";


import 'react-tooltip/dist/react-tooltip.css';
import styles from "../styles/Home.module.scss";

const ProductForm = (props) => {
  const {
    saveProduct,
    setProducts,
    id,
    product,
    formType, 
  } = props;
  console.log("ProductForm - product: ", product);
  console.log("ProductForm - formType: ", formType);

  const [newProduct, setNewProduct] = useState(product || {
    productName: "",
    productOwnerName: "",
    Developers: [],
    scrumMasterName: "",
    startDate: "",
    methodology: "",
  });

  console.log("saveProduct", saveProduct)

  // console.log("newProduct: ", newProduct);
  // const [errorMessage, setErrorMessage] = useState("");

  const handleSaveProduct = () => {
    saveProduct(newProduct, setProducts);
    // setView("TABLE")
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newVal =  // change date format to `YYYY/MM/DD`
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
      !newProduct.Developers.length ||
      newProduct.Developers.some((d) => !d) ||
      !newProduct.scrumMasterName ||
      !newProduct.startDate ||
      !newProduct.methodology
    ) {
      // setErrorMessage("Please fill out all fields.");
      return;
    } else {
      handleSaveProduct();
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
  };

  return (
    <>
      <h2>{formType} Product</h2>
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

        <div className={styles.developers}>
          Developers
          {newProduct.Developers.map((developer, index) => (
            <div key={index} className={styles.developersInner} >
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
                  <small>Remove Developer</small>
                </button>
              )}
            </div>
          ))}
          {newProduct.Developers.length < 5 && (
            <button type="button" onClick={handleAddDeveloper}>
              Add Developer
            </button>
          )}
        </div>

        <label>
          Scrum Master Name:<br />
          <input
            name="scrumMasterName"
            value={newProduct.scrumMasterName}
            onChange={handleOnChange}
            required
          />
        </label>

        {<label>
          Start Date:<br />
          <input
            name="startDate"
            value={newProduct.startDate.replace(/\//g, "-")}
            onChange={handleOnChange}
            type="date"
            required
            disabled={formType === "Edit"}
          />
        </label>}

        <label>
          Methodology:<br />
          <div className={styles.radioBtns}>
            <input
              name="methodology"
              id="agile"
              value="Agile"
              onChange={handleOnChange}
              type="radio"
              required
              style={{ width: "20px", minWidth: "20px" }}
            />
            <label htmlFor="agile">Agile</label>
            <input
              name="methodology"
              id="waterfall"
              value="Waterfall"
              onChange={handleOnChange}
              type="radio"
              required
              style={{ width: "20px", minWidth: "20px" }}
            />
            <label htmlFor="waterfall">Waterfall</label>
          </div>
        </label>

        <div className={styles.submitForm}>

          {formType === "Create" &&
            <button id="submit-btn" type="submit" data-tip data-for="submit-tooltip">
              Add Product
            </button>}

          {formType === "Edit" &&
            <button id="submit-btn" type="submit" data-tip data-for="submit-tooltip">
              Edit Product
            </button>}
          <button type="reset" onClick={handleReset}>Reset</button>
          <Tooltip id="submit-tooltip" place="top" type="error" effect="solid" />
        </div>
      </form>
    </>
  );
};

export default ProductForm;