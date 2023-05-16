import { data } from "./dummyData";
import { v4 as uuidv4 } from "uuid";

export function getInitialProducts() {
  return data;
}

export function addProductToList(newProduct) {
  data.push({
    id: data.length,
    productId: uuidv4(),
    ...newProduct,
  });
  return data;
}

export function updateProduct(products, productEdit) {
  const { id } = productEdit;
  let editIndex = -1;

  //replace obj with matching id
  products.forEach((product, i) => {
    if (product.id === id) {
      editIndex = i;
      products[i] = { ...product, ...productEdit };
      console.log("editIndex: ", editIndex);
    }
  });

  // return products is a temporary solution but not good
  // 

  return { data: products, editIndex };
}
