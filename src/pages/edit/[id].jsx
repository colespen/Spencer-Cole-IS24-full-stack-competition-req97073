import ProductForm from "../../components/ProductForm";
import { fetchProductById } from "../../services/products";

// server-side data pre-rendered on each request
export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log("********** id in getSSP in /edit/[id]: ", id);

  const product = await fetchProductById(id);

  return {
    props: {
      product,
    },
  };
}

const EditProduct = ({ product }) => {
  console.log(
    "********** first time this route is accessed, new product data disappears **********"
  );
  console.log(
    "********** products.length returns to 40 ... **********"
  );

  return (
    <>
      <ProductForm product={product} />
    </>
  );
};

export default EditProduct;
