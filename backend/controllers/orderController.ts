import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Order from "../models/orderModel";
import { JwtPayload } from "jsonwebtoken";

// @desc    Create new order
// @route   Get /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const Req = req as JwtPayload;
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = Req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x: any) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: Req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    get logged in user orders
// @route   Get /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const Req = req as JwtPayload;
  const orders = await Order.find({ user: Req.user._id });
  res.status(200).json(orders);
});

// @desc    get order by ID
// @route   Get /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const Req = req as JwtPayload;
  const order = await Order.findById(Req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
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
