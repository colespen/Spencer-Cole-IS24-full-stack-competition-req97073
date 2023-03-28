import { data } from '../../data/dummyData';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { method } = req;

  switch (method) {

    case "GET":
      console.log(req.query);
      // check for id then find and send match!
      if (Object.keys(req.query).length) {
        const id = parseInt(req.query.id);
        const match = data.find((product) => product.id === id);
        // console.log("GET -- match: ", match);
        if (!match) {
          res.status(404).json({ message: `product with id ${id} was not found` });
          return;
        }
        res.status(200).json(match);
        return;
      }
      res.status(200).json(data);
      break;

    case "POST":
      console.log("POST -- req.body: ", req.body);
      data.push({
        id: data.length,
        productId: uuidv4(),
        ...req.body,
      });
      res.status(200).json(data);
      break;

    case "PUT":
      console.log("PUT -- req.body: ", req.body);
      const { id } = req.body;
      let editIndex = -1;
      //replace obj with matching id
      data.forEach((product, i) => {
        if (product.id === id) {
          editIndex = i;
          data[i] = { ...product, ...req.body };
        }
      });
      if (editIndex === -1) {
        res.status(404).json({ message: `product with id ${id} was not found` });
      } else {
        res.status(200).json(data);
      }
      console.log("PUT -- data: ", data);
      break;

    case "DELETE":
      res.status(200);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}