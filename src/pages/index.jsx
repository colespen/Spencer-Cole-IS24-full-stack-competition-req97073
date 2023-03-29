import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ProductTable from "../components/ProductTable";
import EditProduct from "./product/[id]";

import {
  fetchInitialProducts,
  fetchProducts
} from "../services/products";

import { filterByKey } from "../helpers/sort";
// import { usePrevId } from "../hooks/usePrevId";

export async function getStaticProps() {
  const initialProducts = await fetchInitialProducts();
  return { props: { initialProducts } };
}

// all props I need to pass come from this parent component 
export default function Home({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [view, setView] = useState("TABLE");
  const [formType, setFormType] = useState("");
  const [query, setQuery] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [currId, setCurrId] = useState(null);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('prevId'));
    setCurrId(id);
  }, []);

  console.log("currId -- Home: ", currId);


  useEffect(() => {
    let filteredProducts;
    if (!query) {
      // TODO: this shouldn't run on first render
      filteredProducts = initialProducts;
    } else {
      filteredProducts =
        filterByKey(initialProducts, query, filterKey);
    }
    setProducts(filteredProducts);
  }, [initialProducts, query, filterKey]);


  const handleFetchProducts = () => {
    fetchProducts(setProducts);
    setView("TABLE");
  };

  const handleNewProduct = () => {
    setFormType("Create");
    setView("FORM");
    setCurrId(null)
  };
  // console.log("products: ", products)
  // console.log("view | formType: ", view + " | " + formType)

  return (
    <>
      {view === "TABLE" && <Layout
        handleFetchProducts={handleFetchProducts}
        handleNewProduct={handleNewProduct}
        products={products}
        setView={setView}
        view={view}
        setQuery={setQuery}
        filterKey={filterKey}
      >
        <ProductTable
          products={products}
          setView={setView}
          setFormType={setFormType}
          formType={formType}
          setFilterKey={setFilterKey}
          currId={currId}
          setCurrId={setCurrId}
        // prevId={prevId}
        />
      </Layout>}
      {view === "FORM" && <EditProduct
        // props all work in Layout & ProductForm 
        // when UI renders Client Side 
        product={null} // getSSP
        id={null}     // getSSP
        setProducts={setProducts}
        formType={formType}
        view={view}
        setView={setView}
        products={products}
        handleFetchProducts={handleFetchProducts}
        handleNewProduct={handleNewProduct}
        setQuery={setQuery}
        filterKey={filterKey}
      />}
    </>
  );
}