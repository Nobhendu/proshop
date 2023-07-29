import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.ts";
import { notFound, errorHandler } from "./middleware/errorMiddleware.ts";
import express, { ErrorRequestHandler, Request, Response } from "express";
import productRoutes from "./routes/productRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use((_req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler as ErrorRequestHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
