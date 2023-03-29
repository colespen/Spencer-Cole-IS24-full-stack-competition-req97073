import Layout from "../../components/Layout";
import ProductForm from "../../components/ProductForm";
import { fetchProductById, fetchInitialProducts } from "../../services/products";

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log("getServerSideProps -- id: ", id);

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
    products, // SSR
    view, // ** using as undefined 
    formType, // ** using as undefined 
    handleFetchProducts, // **
    handleNewProduct, // **
    setView, // **
    setProducts, // **
    setQuery // **
  } = props;

  // console.log("PROP:", formType)

  return (
    // NEED ACCESS TO THESE PROPS BELOW
    <Layout
      products={products} //this works now since fetch in SSP
      handleFetchProducts={handleFetchProducts} // **
      handleNewProduct={handleNewProduct} // **
      setProducts={setProducts} // **
      setView={setView} // **
      view={view} // **
      setQuery={setQuery} // **
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
