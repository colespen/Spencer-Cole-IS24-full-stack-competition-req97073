import ProductForm from "../../components/ProductForm";

export async function getServerSideProps (context) {
  console.log("getServerSideProps: ", context.query);
  return {
    props: {
      id: context.query.id,
      product: context.query.product,
    }
  };
};

const EditProduct = ({ id, product }) => {

  return (
    <ProductForm 
    id={id} 
    product={product} 
    />
  );
};

export default EditProduct;
