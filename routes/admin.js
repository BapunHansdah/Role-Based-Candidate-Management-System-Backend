import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/auth.js";
import Joi from "joi";
import {
  hashPassword,
  comparePassword,
  generateToken,
  setTokenCookie,
} from "../utils/auth.js";

const router = express.Router();

const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string(),
});

router.get("/candidates", authMiddleware, async (req, res) => {
  try {
    //check if user is admin
    if (req.user.role !== "admin") {
      throw new Error("You are not authorized to view candidates");
    }
    const users = await User.find({ role: "user" });
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route POST /register
router.post("/candidate/create", authMiddleware, async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    //validate user
    const { error } = userRegisterSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    //check if user is admin
    if (req.user.role !== "admin") {
      throw new Error("You are not authorized to register a user");
    }
    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");

    //hash password
    const hashedPassword = await hashPassword(password);

    //create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      phone,
    });

    res.status(201).json({ user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route POST /delete
router.delete("/candidate/delete/:id", authMiddleware, async (req, res) => {
  try {
    //check if user is admin
    if (req.user.role !== "admin") {
      throw new Error("You are not authorized to delete a user");
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new Error("User not found");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
