import styles from "../styles/Home.module.scss";

const Header = (props) => {
  const {
    handleFetchProducts,
    handleNewProduct,
    products,
    view
  } = props;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <button onClick={handleFetchProducts}>
          {view === "TABLE" ? "Update" : "View"} Products
        </button>
        <button onClick={handleNewProduct}>
          New Product
        </button>
      </nav >
      <div className={styles.productCount}>
        <h1>Total Products: {products.length-1} 
          </h1>
      </div>
    </header>
  );
};

export default Header;