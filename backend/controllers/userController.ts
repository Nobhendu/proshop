import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";
import { JwtPayload } from "jsonwebtoken";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  const user: any = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user: any = await User.create({ name, email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const Req = req as JwtPayload;

  const user = await User.findById(Req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const Req = req as JwtPayload;

  const user = await User.findById(Req.user._id);
  if (user) {
    user.name = Req.body.name || user.name;
    user.email = Req.body.email || user.email;
    if (Req.body.password) user.password = Req.body.password;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
