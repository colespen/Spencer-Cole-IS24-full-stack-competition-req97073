import Layout from "../../components/Layout";
import ProductForm from "../../components/ProductForm";
import { fetchProductById, fetchInitialProducts } from "../../services/products";
// when [id].jsx is dynamically rendered w SSProps props '*' are undefined
export async function getServerSideProps(context) {
  const { id } = context.query;

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

    <Layout // <-- in '/src/components/'
      handleFetchProducts={handleFetchProducts} // **
      handleNewProduct={handleNewProduct} // **
      products={products} //this works now
      view={view} // **
    >
      <ProductForm // < -- in '/src/components/'
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
