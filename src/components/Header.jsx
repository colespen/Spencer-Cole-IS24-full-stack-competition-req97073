import styles from "../styles/Home.module.scss";

import SearchBar from "./SearchBar";

const Header = (props) => {
  const {
    handleFetchProducts,
    handleNewProduct,
    products,
    setView,
    view,
    setQuery,
    filterKey
  } = props;

  console.log("view: ", view);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {view === "TABLE" ?
          <button onClick={handleFetchProducts}>
            Update Products
          </button> :
          <button onClick={() => setView("TABLE")}>
            View Products
          </button>
        }
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
      {/* TODO: Only render for "TABLE" view 
      && current props undefined in /[id]  */}
      {/* <SearchBar
        setQuery={setQuery}
        filterKey={filterKey}
      /> */}
    </header>
  );
};

export default Header;