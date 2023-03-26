import { data } from '../../data/dummyData';

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(data);
      break;

    case "POST":
      const { todo, completed } = req.body;
      data.push({
        id: data.length + 1,
        todo,
        completed: false,
        userId: 0,
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