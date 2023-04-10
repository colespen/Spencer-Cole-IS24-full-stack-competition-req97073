import { data } from './dummyData';
import { v4 as uuidv4 } from 'uuid';

export function addProductToList(newProduct) {
  data.push({
    id: data.length,
    productId: uuidv4(),
    ...newProduct,
  });
  return data;
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