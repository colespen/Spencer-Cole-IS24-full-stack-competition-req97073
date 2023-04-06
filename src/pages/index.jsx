import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import ProductTable from "../components/ProductTable";
import EditProduct from "./product/[id]";
import {
  fetchInitialProducts,
  fetchProducts
} from "../services/products";
import { filterByKey } from "../helpers/sort";

// import { data } from "../data/dummyData";

// static generation will pre-render at build time
export async function getStaticProps() {
  const initialProducts = await fetchInitialProducts();
  // const initialProducts = data;
  return {
    props: {
      initialProducts
    }
  };
}
export default function Home({ initialProducts }) {

  const [products, setProducts] = useState(
    initialProducts || [] // was null
  );
  const [view, setView] = useState("TABLE");
  const [formType, setFormType] = useState("");
  const [query, setQuery] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [currId, setCurrId] = useState(""); // was (null)
  /* 
  **************** PROBLEM ****************
  'products' reverts to initial 'data' state after first Home-->editForm transition due to Next.js performing a [Fast Refresh] client/server rebuild. 
  FIRST TIME only. subsequent rerenders after this error are fine...  */

  // console.log("products: ", products);

  // set init length for check when first new product added
  const initLengthRef = useRef(initialProducts.length - 1);

  useEffect(() => {
    // store id from edit for filter
    const prevId = JSON.parse(localStorage.getItem('prevId'));
    setCurrId(prevId);
  }, []);

  // for search query
  useEffect(() => {
    let filteredProducts;
    if (!query) {
      filteredProducts = products;
      // all products was initialProducts
    } else {
      filteredProducts =
        filterByKey(products, query, filterKey);
    }
    setProducts(filteredProducts);
  }, [products, query, filterKey]);


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
          id={null}      // getServerSideProps
          product={null} // getServerSideProps
          products={products || null}
          setProducts={setProducts || null}
          formType={formType || null}
          view={view || null}
          setView={setView || null}
          handleFetchProducts={handleFetchProducts || null}
          handleNewProduct={handleNewProduct || null}
          setQuery={setQuery || null}
          filterKey={filterKey || null}
        />}
    </>
  );
}