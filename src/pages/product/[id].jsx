import Layout from "../../components/Layout";
import ProductForm from "../../components/ProductForm";
import {
  fetchProductById,
  fetchInitialProducts
} from "../../services/products";

// server-side data pre-rendered on each request 
export async function getServerSideProps(context) {
  const { id } = context.query;
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
    id, // fetched with ServerSideProps
    product, // ServerSideProps
    products, // ServerSideProps || props
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