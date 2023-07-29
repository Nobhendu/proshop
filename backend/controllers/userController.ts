import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
// import User from "../models/userModel";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (_req: Request, res: Response) => {
  res.send("authUser");
});

// @desc    Register user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (_req: Request, res: Response) => {
  res.send("registerUser");
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  res.send("logoutUser");
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (_req: Request, res: Response) => {
  res.send("getUserProfile");
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (_req: Request, res: Response) => {
  res.send("updateUserProfile");
});

// @desc    Get users
// @route   GET /api/users/
// @access  Private/Admin
const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  res.send("getUsers");
});

// @desc    Get users
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (_req: Request, res: Response) => {
  res.send("getUserById");
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (_req: Request, res: Response) => {
  res.send("deleteUser");
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (_req: Request, res: Response) => {
  res.send("updateUser");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
