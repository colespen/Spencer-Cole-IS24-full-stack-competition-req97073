import Layout from "../../components/Layout";
import ProductForm from "../../components/ProductForm";
import {
  fetchProductById,
  fetchInitialProducts
} from "../../services/products";

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log("ID -- getSSP:", id)
  const product = await fetchProductById(id);
  const products = await fetchInitialProducts();
  return {
    props: {
      id,
      product,
      products
    }
  };
};

const EditProduct = (props) => {
  const {
    id, // fetched with SSR
    product, // SSR
    products, // SSR
    view,
    formType,
    handleFetchProducts,
    handleNewProduct,
    setView,
    setProducts,
    setQuery
  } = props;

  return (
    <Layout
      products={products}
      handleFetchProducts={handleFetchProducts}
      handleNewProduct={handleNewProduct}
      setProducts={setProducts}
      setView={setView}
      view={view}
      setQuery={setQuery}
    >
      <ProductForm
        id={id}
        product={product}
        formType={formType}
        setProducts={setProducts}
        setView={setView}
        view={view}
      />
    </Layout>
  );
};

export default EditProduct;