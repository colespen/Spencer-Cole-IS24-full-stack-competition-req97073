const fetchInitialProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  // console.log("response: ", response) 
  const data = await response.json();
  return data;
};


const fetchProducts = async (setProducts) => {
  const response = await fetch("/api/products"); // "Get" default
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  const data = await response.json();
  // console.log("data in fetchProducts: ", data);
  setProducts(data);
};


const fetchProductById = async (id) => {
  const response = await fetch(`http://localhost:3000/api/products?${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  const data = await response.json();
  // console.log("data in fetchId: ", data);
  return data;
};

const saveProduct = async (dataObj, setProducts) => {
  console.log("saveProduct -- dataObj: ", dataObj);
  const response = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(dataObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  // console.log("response: ", response)
  const data = await response.json();
  setProducts(data);
};

const editProduct = async (dataObj, setProducts) => {
  console.log("editProduct -- dataObj: ", dataObj);
  const response = await fetch("/api/products/", {
    method: "PUT",
    body: JSON.stringify(dataObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  // console.log("response: ", response)
  const data = await response.json();
  setProducts(data);
};

export {
  fetchInitialProducts,
  fetchProducts,
  fetchProductById,
  saveProduct,
  editProduct
};