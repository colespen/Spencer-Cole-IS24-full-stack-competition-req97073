import { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import { fetchInitialProducts } from "../services/products";
import { filterByKey } from "../helpers/sort";

import ProductTable from "../components/ProductTable";

// static generation will pre-render at build time
export async function getStaticProps() {
  const initialProducts = await fetchInitialProducts();
  return {
    props: {
      initialProducts,
    },
  };
}

export default function Home({ initialProducts }) {
  const { productsContext, queryContext, filterKeyContext } =
    useContext(GlobalContext);
  const [products, setProducts] = productsContext;
  const [query] = queryContext;
  const [filterKey, setFilterKey] = filterKeyContext;
  // this is the last clicked product id
  const [currId, setCurrId] = useState("");
  // filter products state for query or default products
  const [filterProducts, setFilterProducts] = useState(products);

  // set init length for check when first new product added
  const initLengthRef = useRef(initialProducts.length);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts, setProducts]);

  useEffect(() => {
    // store id from edit for filter
    const prevId = JSON.parse(localStorage.getItem("prevId"));
    setCurrId(prevId);
  }, []);

  // for search query
  useEffect(() => {
    let filterProducts;
    if (!query) {
      filterProducts = products;
    } else {
      filterProducts = filterByKey(products, query, filterKey);
    }
    setFilterProducts(filterProducts);
  }, [products, query, filterKey]);

  return (
    <>
      <ProductTable
        products={filterProducts}
        setFilterKey={setFilterKey}
        currId={currId}
        initLengthRef={initLengthRef}
      />
    </>
  );
}
