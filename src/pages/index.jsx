import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import ProductTable from "../components/ProductTable";
import EditProduct from "./product/[id]";
import {
  fetchInitialProducts,
  fetchProducts
} from "../services/products";
import { filterByKey } from "../helpers/sort";

// static generation will pre-render at build time
export async function getStaticProps() {
  const initialProducts = await fetchInitialProducts();
  return { props: { initialProducts } };
}

export default function Home({ initialProducts }) {
  const [products, setProducts] = useState(
    initialProducts || null
  );
  const [view, setView] = useState("TABLE");
  const [formType, setFormType] = useState("");
  const [query, setQuery] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [currId, setCurrId] = useState(null);

  // set init length for check when first new product added
  const initLengthRef = useRef(initialProducts.length - 1);

  // **************** PROBLEM ****************
  // 'products' is initial 'data' state after first
  // Home-->editForm-->Home 
  // OR error if newly added table is clicked
  //
  // FIRST TIME only. subsequent rerenders after this error  
  // are fine...

  // console.log("initialProducts -- HOME: ", initialProducts);
  console.log("products -- HOME: ", products);

  useEffect(() => {
    // store id from edit for filter
    const prevId = JSON.parse(localStorage.getItem('prevId'));
    setCurrId(prevId);
  }, []);

  // for search query
  useEffect(() => {
    let filteredProducts;
    if (!query) {
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
    setCurrId(null);
  };

  return (
    <>
      {view === "TABLE" &&
        <Layout
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
            setProducts={setProducts}
            setView={setView}
            setFormType={setFormType}
            formType={formType}
            setFilterKey={setFilterKey}
            currId={currId}
            setCurrId={setCurrId}
            initLengthRef={initLengthRef}
          />
        </Layout>}
      {view === "FORM" &&
        <EditProduct
          id={null}      // getSSP
          product={null} // getSSP
          products={products}
          setProducts={setProducts}
          formType={formType}
          view={view}
          setView={setView}
          handleFetchProducts={handleFetchProducts}
          handleNewProduct={handleNewProduct}
          setQuery={setQuery}
          filterKey={filterKey}
        />}
    </>
  );
}