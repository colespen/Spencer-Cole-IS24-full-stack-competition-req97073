import ProductForm from "../../components/ProductForm";
import { fetchProductById } from "../../services/products";

// server-side data pre-rendered on each request 
export async function getServerSideProps(context) {
  const { id } = context.query;

  const product = await fetchProductById(id);

  return {
    props: {
      product
    }
  };
};


const EditProduct = ({ product }) => {

  return (
    <>
      <ProductForm product={product} />
    </>
  );
};

export default EditProduct;
