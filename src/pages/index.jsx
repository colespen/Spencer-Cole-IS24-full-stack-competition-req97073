import { useState } from "react";

import Head from "next/head";

import styles from "../styles/Home.module.css";

import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

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

  const fetchProducts = async () => {
    setView("TABLE");
    const response = await fetch("/api/products"); // "Get" default
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }
    // console.log("response: ", response) 
    const data = await response.json();
    setProducts(data);

  };

  const saveProduct = async (dataObj) => {
    console.log("dataObj: ", dataObj);
    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(dataObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }
    // console.log("response: ", response)
    const data = await response.json();
    setProducts(data);
  };

  return (
    <div className={styles.mainDiv}>
      <Head>
        <title>Product Tracker</title>
        <meta name="description" content="Track products..." />
        <link rel="icon" href="" />
      </Head>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <button onClick={fetchProducts}>
            Get Products
          </button>
          <button onClick={() => setView("FORM")}>
            New Product
          </button>
        </nav >

        {/* // Saves a new product item when submitted */}
        {view === "FORM" && <ProductForm saveProducts={saveProduct}
        />}
        <div>
          {view === "TABLE" && <ProductTable products={products} />}
        </div>
      </main>
    </div>
  );
}

