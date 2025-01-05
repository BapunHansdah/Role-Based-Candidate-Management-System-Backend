import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    phone: { type: String },
    avatar: { type: String },
    resume: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User__", userSchema);
export default User;
