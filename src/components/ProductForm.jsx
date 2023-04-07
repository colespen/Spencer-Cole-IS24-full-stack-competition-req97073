import { useRouter } from "next/router";
import { useState, useRef } from "react";
import Form from "./Form";

import { saveProduct, editProduct } from "../services/products";

const ProductForm = (props) => {
  const {
    setProducts,
    product,
    formType,
    setView,
    view,
  } = props;

  // product in form values separately 
  const [newProduct, setNewProduct] = useState(product || {
    productName: "",
    productOwnerName: "",
    Developers: [""],
    scrumMasterName: "",
    startDate: "",
    methodology: "",
  });
  const [formTitle, setFormTitle] = useState("");
  const [btnColor, setBtnColor] = useState("#44455b");
  const router = useRouter();
  const formRef = useRef(null);

  // ABSTRACT HANDLERS

  const handleSaveProduct = async () => {
    const newProducts = await saveProduct(newProduct);
    setProducts(newProducts);
  };

  const handleEditProduct = () => {
    editProduct(newProduct);
  };

  // capture value change and set state
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
    if (e.target.type === "reset") handleReset();
    if ( // check for empty fields and trigger Tooltip on submit
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
        setBtnColor("#232c8d");
        setFormTitle("Added!");
        handleSaveProduct();
      }
      if (btnId === "edit-btn") {
        setBtnColor("#e39b6091");
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
    setNewProduct(prev => ({
      productName: "",
      productOwnerName: "",
      Developers: [],
      scrumMasterName: "",
      startDate: !formType ? prev.startDate : "",
      methodology: "",
    }));
  };

  return (
    <Form
      formRef={formRef}
      formType={formType}
      formTitle={formTitle}
      handleOnSubmit={handleOnSubmit}
      newProduct={newProduct}
      handleOnChange={handleOnChange}
      handleDeveloperChange={handleDeveloperChange}
      handleRemoveDeveloper={handleRemoveDeveloper}
      handleAddDeveloper={handleAddDeveloper}
      handleReset={handleReset}
      btnColor={btnColor}
    />
  );
};

export default ProductForm;
