import { useState } from "react";

import Head from "next/head";

import styles from "../styles/Home.module.scss";

import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

import { fetchProducts, saveProduct } from "../services/products";

export default function Home() {
  const [view, setView] = useState("TABLE");
  const [products, setProducts] = useState([]);
  console.log("products: ", products);

  // const [newProduct, setNewProduct] = useState({
  //   productId: "",
  //   productName: "",
  //   productOwnerName: "",
  //   Developers: [],
  //   scrumMasterName: "",
  //   startDate: "",
  //   methodology: ""
  // });

  const handleFetchProducts = () => {
    fetchProducts(setProducts);
    setView("TABLE");
  };

  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Product Tracker</title>
        <meta name="description" content="Track products..." />
        <link rel="icon" href="" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <button onClick={handleFetchProducts}>
              Get Products
            </button>
            <button onClick={() => setView("FORM")}>
              New Product
            </button>
          </nav >
          <div className={styles.productCount}>
            <h1>Total Products: {products.length} </h1>
          </div>
        </header>

        {view === "FORM" && <ProductForm
          setProducts={setProducts}
          saveProduct={saveProduct}
        />}
        <div>
          {view === "TABLE" && <ProductTable
            products={products}
          />}
        </div>
      </main>
    </div>
  );
}

