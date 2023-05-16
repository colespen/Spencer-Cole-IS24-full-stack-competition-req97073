import { useState, useEffect, useContext } from "react";
import ProductForm from "../../components/ProductForm";
import { GlobalContext } from "../../context/GlobalState";
// import { fetchProductById } from "../../services/products";

// server-side data pre-rendered on each request
export async function getServerSideProps(context) {
  const { id } = context.query;
  // const product = await fetchProductById(id);

  return {
    props: {
      id,
    },
  };
}

const EditProduct = ({ id }) => {
  const { productsContext } = useContext(GlobalContext);
  const [products] = productsContext;
  const [prod, setProd] = useState(null);

  useEffect(() => {
    const product = products.find((product) => product.id === parseInt(id));
    setProd(product);
  }, [id, products]);

  return <>{!prod ? <div>Loading...</div> : <ProductForm product={prod} />}</>;
};

export default EditProduct;
