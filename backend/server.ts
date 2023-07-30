import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.ts";
import { notFound, errorHandler } from "./middleware/errorMiddleware.ts";
import express, { ErrorRequestHandler, Request, Response } from "express";
import productRoutes from "./routes/productRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const whitelist = ["http://localhost:5000", "http://localhost:5173"];
app.options("*", cors());
const corsOptions = {
  credentials: true,
  origin: (
    origin: any,
    callback: (arg0: Error | null, arg1: boolean | undefined) => void
  ) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), undefined);
    }
  },
};
app.use(cors(corsOptions as CorsOptions));

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
