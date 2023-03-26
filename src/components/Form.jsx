import styles from "../styles/Home.module.css";

const Form = ({ handleSubmit, handleChange, newProduct }) => {

  // const handleChange = (e) => {
  //   setNewProduct({
  //     productName: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   saveProducts();
  //   setNewProduct({
  //     productId: "",
  //     productName: "",
  //     productOwnerName: "",
  //     Developers: [],
  //     scrumMasterName: "",
  //     startDate: "",
  //     methodology: "",
  //   });
  // };

  return (
    <form onSubmit={handleSubmit}>
      <label>
      Product Name: <input type="text" onChange={handleChange} value={newProduct.productName} />

      </label>
      <button>Add Product</button>
    </form>
  );
};

export default Form;