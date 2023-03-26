import { useState } from "react";

import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

import Table from "../components/Table";
import Form from "../components/Form";

export default function Home() {
  const [products, setProducts] = useState([]);
  console.log("products: ", products);

  const [newProduct, setNewProduct] = useState({
    productId: "",
    productName: "",
    productOwnerName: "",
    Developers: [],
    scrumMasterName: "",
    startDate: "",
    methodology: ""
  });

  const fetchProducts = async () => {
    const response = await fetch("/api/products"); // "Get" default
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }
    // console.log("response: ", response) 
    const data = await response.json();
    setProducts(data);

  };

  const saveProduct = async (e) => {
    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }
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
        {/* // Fetches the product items when clicked */}
        <button onClick={fetchProducts}>Get Products</button>
        <Link></Link>
        <button>New Product</button>

        {/* // Saves a new product item when submitted */}
        {/* <Form 
          setNewProduct={setNewProduct}
          saveProducts={saveProduct}
          newProduct={newProduct}
        /> */}
        <div>
          <Table products={products} />
        </div>
      </main>
    </div>
  );
}

