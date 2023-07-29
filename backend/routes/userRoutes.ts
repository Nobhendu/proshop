import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController";

router.route("/").get(getUsers).post(registerUser);
router.route("/logout").post(logoutUser);
router.route("/login").post(authUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
