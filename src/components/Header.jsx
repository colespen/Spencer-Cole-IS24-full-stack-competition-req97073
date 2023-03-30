import Link from "next/link";
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

  const handleViewProducts = () => {
    if (view === "FORM") {
      setView("TABLE");
    }
    return;
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>

        {view === "TABLE" ?
          <button onClick={handleFetchProducts}>
            Update Products
          </button>
          :
          <button onClick={handleViewProducts}>
            <Link href="/">View Products</Link>
          </button>
        }
        {<button
          onClick={handleNewProduct}
          style={{
            visibility: view === "TABLE" ? "visible" : "hidden"
          }}
        >New Product
        </button>}

      </nav >
      <div className={styles.productCount}>
        <h1>
          Total Products: {products.length - 1 === -1 ?
            0 : products.length}
        </h1>
      </div>
      {view === "TABLE" && <SearchBar
        setQuery={setQuery}
        filterKey={filterKey}
      />}
    </header>
  );
};

export default Header;