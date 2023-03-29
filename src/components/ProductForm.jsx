import { useRouter } from "next/router";
import { useState, useRef } from "react";
import Form from "./Form";

import { saveProduct, editProduct } from "../services/products";



const ProductForm = (props) => {
  const {
    setProducts,
    id,
    product,
    formType,
    setView,
    view,
  } = props;

  const [newProduct, setNewProduct] = useState(product || {
    productName: "",
    productOwnerName: "",
    Developers: [""],
    scrumMasterName: "",
    startDate: "",
    methodology: "",
  });
  const [formTitle, setFormTitle] = useState("");
  const router = useRouter();
  const formRef = useRef(null);

  console.log("ProductForm -- formType: ", formType);


  const handleSaveProduct = () => {
    saveProduct(newProduct, setProducts);
  };
  const handleEditProduct = () => {
    editProduct(newProduct);
  };

  const handleOnChange = (e) => {
    const { name, value, id } = e.target;
    let newVal = value;
    if (name === "startDate") newVal = value.replace(/-/g, "/");
    if (name === "methodology") newVal = id;
    // set as array of strings if Developers
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
    const { btnId } = formRef.current;
    e.preventDefault();
    if (e.target.type === "reset") {
      handleReset();
    }
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
      return;
    } else {
      if (btnId === "add-btn") {
        setFormTitle("Added!");
        handleSaveProduct();
      }
      if (btnId === "edit-btn") {
        setFormTitle("Edited!");
        handleEditProduct();
      }
      const tableViewDelay = setTimeout(() => {
        router.push("/");
        if (view === "FORM") setView("TABLE");
        if (view === "TABLE") handleReset();
      }, 600);
      return () => clearTimeout(tableViewDelay);
    }
  };

  const handleReset = () => {
    setNewProduct({
      productName: "",
      productOwnerName: "",
      Developers: [],
      scrumMasterName: "",
      startDate: "",
      methodology: "",
    });
  };

  return (
    <>
      {!formTitle &&
        <h2>{!formType ? "Edit Product" : "Create Product"}</h2>}
      {formTitle && <h2>Product {formTitle}</h2>}
      <Form
        formRef={formRef}
        formType={formType}
        handleOnSubmit={handleOnSubmit}
        newProduct={newProduct}
        handleOnChange={handleOnChange}
        handleDeveloperChange={handleDeveloperChange}
        handleRemoveDeveloper={handleRemoveDeveloper}
        handleAddDeveloper={handleAddDeveloper}
        handleReset={handleReset}
      />
    </>
  );
};

export default ProductForm;