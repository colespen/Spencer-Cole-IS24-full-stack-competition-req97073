import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { fetchProducts } from "../services/products";
import { useRouter } from "next/router";

import Link from "next/link";
import SearchBar from "./SearchBar";

import styles from "../styles/Home.module.scss";

const Header = () => {
  const {
    productsContext,
    queryContext,
    filterKeyContext
  } = useContext(GlobalContext);
  const [products, setProducts] = productsContext;
  const [_, setQuery] = queryContext;
  const [filterKey] = filterKeyContext;

  const { asPath } = useRouter();
  const isHome = asPath === "/";

  const handleFetchProducts = () => {
    // currently disabled because edits not writing to memory
    // const products = await fetchProducts();
    setProducts(products);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {isHome ?
          <button onClick={handleFetchProducts}>
            Update Products
          </button>
          :
          <button >
            <Link href="/">View Products</Link>
          </button>
        }
        {<button
          style={{
            visibility: isHome ? "visible" : "hidden"
          }}
        >
          <Link href="/new">New Products</Link>
        </button>}

      </nav >
      <div className={styles.productCount}>
        <h1>
          Total Products: {products.length - 1 === -1 ?
            0 : products.length}
        </h1>
      </div>
      <SearchBar
        setQuery={setQuery}
        filterKey={filterKey}
      />
    </header>
  );
};

export default Header;
