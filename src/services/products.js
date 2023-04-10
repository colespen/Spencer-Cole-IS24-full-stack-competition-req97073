//////  API Calls
const port = process.env.NEXT_PUBLIC_PATH || 3000;
const host = process.env.NEXT_PUBLIC_HOST;
//////  Note: all endpoints originate from /api
//////        - ex. to retrieve :id call is sent to 
//////          `.../api/products?id=...`
const path = host + port;

//  GET  (only used in getStaticProps in Home)
const fetchInitialProducts = async () => {
  const response = await fetch(path + "/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  const data = await response.json();
  return data;
};

//  GET  (only used in 'Update' button)
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
  const { status, statusText } = response;
  if (!response.ok) {
    throw new Error(`Failed to fetch data. ${status}: ${statusText}. hmm..`);
  }
  const data = await response.json();
  // this `data` contains the updated object when the return is commented out!!!!!!!!
  return data; // <-- try commenting this out
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
