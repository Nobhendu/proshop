import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
// import Order from "../models/orderModel";

// @desc    Create new order
// @route   Get /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (_req: Request, res: Response) => {
  res.send("Add order items");
});

// @desc    get logged in user orders
// @route   Get /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (_req: Request, res: Response) => {
  res.send("Get my orders");
});

// @desc    get order by ID
// @route   Get /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (_req: Request, res: Response) => {
  res.send("Get order by ID");
});

// @desc    update order to paid
// @route   Get /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (_req: Request, res: Response) => {
  res.send("update order to paid");
});

// @desc    update order to delivered
// @route   Get /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(
  async (_req: Request, res: Response) => {
    res.send("update order to delivered");
  }
);

// @desc    get all orders
// @route   Get /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (_req: Request, res: Response) => {
  res.send("get orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
