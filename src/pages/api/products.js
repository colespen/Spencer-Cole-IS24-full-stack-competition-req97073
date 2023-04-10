import { data } from '../../lib/dummyData';
import { v4 as uuidv4 } from 'uuid';
import { addProductToList, updateProduct } from '../../lib/products';

console.log("data.length (init: 40) -- /api/products", data.length);

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { method } = req;

  switch (method) {

    case "GET":
      // if query, check for id then find and send match!
      if (Object.keys(req.query).length) {

        // init length is 40 (id 0 - 39)
        console.log("data.length (init: 40) -- GET: ", data.length);

        const id = parseInt(req.query.id);
        // this data does not include last pushed obj when [fast refresh]
        const match = data.find((product) => {
          return product.id === id;
        });
        if (!match) {
          console.log("!match -- inner 'GET");
          res.status(404).json({ message: `Product with id ${id} was not found` });
          return;
        }
        res.status(200).json(match);
        return;
      }
      // else, normal GET
      res.status(200).json(data);
      break;


    case "POST":
      if (!req.body) {
        res.status(400).json({ message: "Product could not be added" });
      }
      const { startDate, productName, Developers } = req.body;
      if (!startDate || !productName || Developers.length === 0) {
        res.status(403).json({ message: "Invalid product data" });
        return;
      }
      const newProducts = addProductToList(req.body);
      res.status(200).json(newProducts);
      break;


    case "PUT":
      const {data, editIndex} = updateProduct(req.body)
      console.log("data -- PUT: ", data)
      if (editIndex === -1) {
        res.status(404).json({ message: `Product # ${id} could not be edited.` });
      } else {
        res.status(200).json(data);
      }
      break;


    case "DELETE":
      res.status(200);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
