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
  console.log("********** new product id in addProductToList: ", data.length);
  return data;
  // *** this data is not updated when the first GET is made after first POST
  // return { data, newProduct };
}

export function updateProduct(productEdit) {
  const { id } = productEdit;
  let editIndex = -1;

  //replace obj with matching id
  data.forEach((product, i) => {
    if (product.id === id) {
      editIndex = i;
      data[i] = { ...product, ...productEdit };
    }
  });
  return { data, editIndex };
}
