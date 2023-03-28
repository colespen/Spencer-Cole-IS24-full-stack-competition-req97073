import { useState } from "react";
import Layout from "../components/Layout";
import ProductTable from "../components/ProductTable";

import {
  fetchInitialProducts,
  fetchProducts
} from "../services/products";
import EditProduct from "./product/[id]";

export async function getStaticProps() {
  const initialProducts = await fetchInitialProducts();
  return { props: { initialProducts } };
}

// all props I need to pass come from this parent component 
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

  console.log("view, formType: ", view, formType)
  console.log("prodcuts.length - Home: ", products.length)

  return (
    <Layout
      handleFetchProducts={handleFetchProducts}
      handleNewProduct={handleNewProduct}
      products={products}
      view={view}
    >
      {view === "TABLE" && <ProductTable
        products={products}
        setView={setView}
        setFormType={setFormType}
        formType={formType}
      />} 
      {view === "FORM" && <EditProduct 
//props all work in Layout & ProductForm when UI renders Client Side 
        setProducts={setProducts}
        formType={formType}
        view={view}
        setView={setView}
        products={products}
        handleFetchProducts={handleFetchProducts}
        handleNewProduct={handleNewProduct}
        product={null}
        id={null}
      />}
    </Layout>
  );
}