

const fetchProducts = async (setProducts) => {
  const response = await fetch("/api/products"); // "Get" default
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  // console.log("response: ", response) 
  const data = await response.json();
  setProducts(data);
};

const saveProduct = async (dataObj, setProducts) => {
  console.log("dataObj: ", dataObj);
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

export {fetchProducts, saveProduct}