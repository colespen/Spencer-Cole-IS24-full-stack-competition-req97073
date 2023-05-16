import { useRouter } from "next/router";
import { useContext, useState, useRef } from "react";
import { saveProduct, editProduct } from "../services/products";
import { GlobalContext } from "../context/GlobalState";

import Form from "./Form";

const ProductForm = ({ product }) => {
  const [newProduct, setNewProduct] = useState(
    product || {
      productName: "",
      productOwnerName: "",
      Developers: [""],
      scrumMasterName: "",
      startDate: "",
      methodology: "",
    }
  );
  const [formTitle, setFormTitle] = useState("");
  const [btnColor, setBtnColor] = useState("#44455b");
  const { productsContext } = useContext(GlobalContext);
  const [products, setProducts] = productsContext;
  const formRef = useRef(null);

  const router = useRouter();
  const { asPath } = useRouter();
  const isCreate = asPath === "/new";
  const isHome = asPath === "/";

  const handleSaveProduct = async () => {
    const newProducts = await saveProduct(newProduct);
    console.log("newProducts: ", newProducts);
    setProducts(newProducts);
  };

  const handleEditProduct = async () => {
    const newProducts = await editProduct(products, newProduct);
    setProducts(newProducts);
  };

  // capture value change and set state
  const handleOnChange = (e) => {
    const { name, value, id } = e.target;
    let newVal = value;
    if (name === "startDate") newVal = value.replace(/-/g, "/");
    if (name === "methodology") newVal = id;
    // set as array of strings if Developers
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "Developers" ? [newVal] : newVal,
    }));
  };

  // max 5 dev's
  const handleAddDeveloper = () => {
    if (newProduct.Developers.length < 5) {
      setNewProduct((prev) => ({
        ...prev,
        Developers: [...prev.Developers, ""],
      }));
    }
  };
  // remove dev
  const handleRemoveDeveloper = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      Developers: prev.Developers.filter((_, i) => i !== index),
    }));
  };

  const handleDeveloperChange = (index, value) => {
    setNewProduct((prev) => {
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
    if (
      // check for empty fields and trigger Tooltip on submit
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
        isHome && handleReset();
      }, 600);
      return () => clearTimeout(tableViewDelay);
    }
  };

  const handleReset = () => {
    setNewProduct((prev) => ({
      ...prev,
      productName: "",
      productOwnerName: "",
      Developers: [""],
      scrumMasterName: "",
      startDate: !isCreate ? prev.startDate : "",
      methodology: "",
    }));
  };

  return (
    <Form
      formRef={formRef}
      isCreate={isCreate}
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
