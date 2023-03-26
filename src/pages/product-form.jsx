import Form from "../components/Form";
import styles from "../styles/Home.module.css";

const ProductForm = ({ setNewProduct, saveProducts }) => {
  const handleChange = (e) => {
    setNewProduct({
      productName: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProducts();
    setNewProduct({
      productId: "",
      productName: "",
      productOwnerName: "",
      Developers: [],
      scrumMasterName: "",
      startDate: "",
      methodology: "",
    });
  };

  

  return (
    <Form />
  );
}

export default Table;