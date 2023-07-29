import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { userType } from "../../frontend/typings/*";

const userSchema: mongoose.Schema<userType> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, (this as userType).password);
};

userSchema.pre("save", async function (next) {
  const This = this as userType;
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  This.password = await bcrypt.hash(This.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
