import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/auth.js";
import Joi from "joi";
import asyncHandler from "express-async-handler";
import {
  hashPassword,
  comparePassword,
  generateToken,
  setTokenCookie,
} from "../utils/auth.js";

const router = express.Router();

const adminRegisterSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  phone: Joi.string(),
  adminCode: Joi.string().required(),
});

// @route POST /admin/register
// Admin Registration
router.post(
  "/admin/register",
  asyncHandler(async (req, res) => {
    const { error } = adminRegisterSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { fullName, email, password, phone, adminCode } = req.body;

    if (adminCode !== process.env.ADMIN_CODE) {
      throw new Error("Invalid admin code");
    }

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name: fullName,
      email,
      password: hashedPassword,
      role: "admin",
      phone,
    });

    const token = generateToken(newUser._id, newUser.role);
    setTokenCookie(res, token);

    res.status(201).json({ user: newUser });
  })
);


// @route POST /login
router.post(
  "/admin/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new Error("User does not exist");

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = generateToken(user._id, user.role);
    setTokenCookie(res, token);

    res.status(200).json({ user });
  })
);


// @route POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    // Set HTTP-only cookie
    setTokenCookie(res, token);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route GET /api/auth/logout
router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
});

// @route GET /api/auth/me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("_id role");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
