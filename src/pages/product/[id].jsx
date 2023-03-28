import Layout from "../../components/Layout";
import ProductForm from "../../components/ProductForm";
import { fetchProductById, fetchInitialProducts } from "../../services/products";

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log("getServerSideProps -- id: ",id)

  const product = await fetchProductById(id);
  const products = await fetchInitialProducts();
  // these work!
  return {
    props: {
      id,
      product,
      products
    }
  };
};

const EditProduct = (props) => {
  //  ** = UNDEFINED
  const {
    id, // fetched with SSR
    product, // SSR
    view, // **
    setView, // **
    formType, // **
    handleFetchProducts, // **
    handleNewProduct, // **
    setProducts, // **
    products, // SSR
  } = props;

  console.log("PROP:", formType)

  return (
    // NEED ACCESS TO THESE PROPS BELOW
    <Layout 
      handleFetchProducts={handleFetchProducts} // **
      handleNewProduct={handleNewProduct} // **
      products={products} //this works now
      view={view} // **
    >
      <ProductForm
        id={id} 
        product={product}
        formType={formType} // **
        setProducts={setProducts} // **
        setView={setView} // **
      />
    </Layout>
  );
};

export default EditProduct;
