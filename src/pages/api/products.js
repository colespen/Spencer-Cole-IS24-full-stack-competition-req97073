import { data } from '../../data/dummyData';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(data);
      break;

    case "POST":
      // const { todo, completed } = req.body;
      console.log("req.body: ", req.body)
      data.push({
        id: data.length,
        productId: uuidv4(),
        ...req.body,
      });
      res.status(200).json(data);
      break;

    case "PUT":
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