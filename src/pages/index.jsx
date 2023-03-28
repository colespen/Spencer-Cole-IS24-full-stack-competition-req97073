import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

import styles from "../styles/Home.module.scss";

import {
  fetchInitialProducts,
  fetchProducts,
  saveProduct
} from "../services/products";

export async function getStaticProps() {
  const initialProducts = await fetchInitialProducts();
  return { props: { initialProducts } };
}

export default function Home({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [view, setView] = useState("TABLE");
  const [formType, setFormType] = useState("");

  const handleFetchProducts = () => {
    fetchProducts(setProducts);
    setView("TABLE");
  };

  const handleNewProduct = () => {
    setFormType("Create");
    setView("FORM");
  };

  return (
    <Layout
      handleFetchProducts={handleFetchProducts}
      handleNewProduct={handleNewProduct}
      products={products}
      view={view}
    >
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
          <h1>Total Products: {products.length} </h1>
        </div>
      </header>

      {view === "FORM" && <ProductForm
        setProducts={setProducts}
        saveProduct={saveProduct}
        formType={formType}
      />}
      {view === "TABLE" && <ProductTable
        products={products}
        setView={setView}
        setFormType={setFormType}
        formType={formType}
      />}
    </Layout>
  );
}