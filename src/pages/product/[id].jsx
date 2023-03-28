import Layout from "../../components/Layout";
import ProductForm from "../../components/ProductForm";
import { fetchProductById } from "../../services/products";

export async function getServerSideProps(context) {
  const {id, formType } = context.query
  
  const product = await fetchProductById(id)
  console.log("fetchProductById - product: ", product)
  // console.log("getServerSideProps -- formType: ", formType);
  return {
    props: {
      id,
      product,
      // formType,
    }
  };
};


const EditProduct = (props) => {
  const {
    id,
    product,
    formType
  } = props;

  return (
    <Layout>
      <ProductForm
        id={id}
        product={product}
        // formType={formType}
      />
    </Layout>
  );
};

export default EditProduct;
