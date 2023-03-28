import styles from "../styles/Home.module.scss";

import SearchBar from "./SearchBar";

const Header = (props) => {
  const {
    handleFetchProducts,
    handleNewProduct,
    products,
    view,
    setQuery,
    filterKey
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
        <h1>
          Total Products: {products.length - 1 === -1 ? 
          0 : products.length - 1}
        </h1>
      </div>
      {/* TODO: Only render for "TABLE" view */}
      <SearchBar 
      setQuery={setQuery}
      filterKey={filterKey} 
      />

    </header>
  );
};

export default Header;