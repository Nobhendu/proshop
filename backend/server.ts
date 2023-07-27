import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import products from "./data/products.ts";

const port = process.env.PORT || 5000;

const app = express();

app.use((_req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running...");
});

app.get("/api/products", (_req: Request, res: Response) => {
  res.json(products);
});

app.get("/api/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
