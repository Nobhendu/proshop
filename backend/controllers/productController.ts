import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";

// @desc    Fetch all products
// @route   Get /api/products
// @access  Public
const getProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch one product
// @route   Get /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (product) return res.json(product);
  else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getProducts, getProductById };
