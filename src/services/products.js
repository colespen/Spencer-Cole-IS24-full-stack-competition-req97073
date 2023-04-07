//////  API Calls
const port = process.env.NEXT_PUBLIC_PATH || 3000;
const host = process.env.NEXT_PUBLIC_HOST;
//////  Note: all endpoints originate from /api
//////        - ex. to retrieve :id call is sent to 
//////          `.../api/products?id=...`
const path = host + port;

//  GET
const fetchInitialProducts = async () => {
  const response = await fetch(path + "/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  const data = await response.json();
  return data;
};

//  GET
const fetchProducts = async () => {
  const response = await fetch(path + "/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  const data = await response.json();
  return data;
};

//  GET
const fetchProductById = async (id) => {
  const response = await fetch(
    path + '/api/products?id=' + id
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  const data = await response.json();
  return data;
};

//  POST
const saveProduct = async (dataObj) => {
  const response = await fetch(path + "/api/products", {
    method: "POST",
    body: JSON.stringify(dataObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  const data = await response.json();
  return data;
};

//  PUT
const editProduct = async (dataObj) => {
  const response = await fetch(path + "/api/products", {
    method: "PUT",
    body: JSON.stringify(dataObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  const data = await response.json();
  return data; 
};

export {
  fetchInitialProducts,
  fetchProducts,
  fetchProductById,
  saveProduct,
  editProduct
};