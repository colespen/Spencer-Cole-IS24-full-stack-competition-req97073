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
  console.log("getStaticProps ran");
  const initialProducts = await fetchInitialProducts();
  // const initialProducts = data;
  return {
    props: {
      initialProducts
    }
  };
}

export default function Home({ initialProducts }) {
  // useEffect to set initial products
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("TABLE");
  const [formType, setFormType] = useState("");
  const [query, setQuery] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [currId, setCurrId] = useState("");

  /* 
  ****************  PROBLEM  ****************
  'products' reverts to initial 'data' state after first Home-->editForm transition due to Next.js performing a [Fast Refresh] client/server rebuild. 
  FIRST TIME only. subsequent rerenders after this error are fine...  
  */

  // set init length for check when first new product added
  const initLengthRef = useRef(initialProducts.length - 1);

  useEffect(() => {
    // store id from edit for filter
    const prevId = JSON.parse(localStorage.getItem('prevId'));
    setCurrId(prevId);
  }, []);

  // for search query
  useEffect(() => {
    let initOrFilterProducts;
    if (!query) {
      initOrFilterProducts = initialProducts;
    } else {
      initOrFilterProducts =
        filterByKey(products, query, filterKey);
    }
    // this sets initialProducts on first render
    setProducts(initOrFilterProducts);
  }, [initialProducts, products, query, filterKey]);


  const handleFetchProducts = async () => {
    const products = await fetchProducts();
    setProducts(products);
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
