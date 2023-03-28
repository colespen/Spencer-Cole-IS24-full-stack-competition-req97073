import { data } from '../../data/dummyData';
import { v4 as uuidv4 } from 'uuid';


export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { method } = req;

  switch (method) {

    case "GET":
      // check for id then find and send match!
      if (Object.keys(req.query).length) {
        // TODO: -- fix
        const id = parseInt(Object.keys(req.query)[0]);
        const match = data.find((product) => product.id === id);
        console.log("GET -- match: ", match);

        if (!match) {
          res.status(404).json({ message: `product with id ${req.query.id} was not found` });
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
      console.log("PUT -- req.params: ", req.params);
      // const { } = req.params;
      // const editedProd = {};
      // const result =
      //   Object.entries(data).map(
      //     ([key, value]) => value.id === editedProd.id
      //       ? { [key]: { ...value, ...editedProd } }
      //       : { [key]: value });

      res.status(200);
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