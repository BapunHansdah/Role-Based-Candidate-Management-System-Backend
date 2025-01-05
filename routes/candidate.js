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
import AWS from "aws-sdk";
import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";

dotenv.config();
// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "tutorio-bucket",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const timestamp = Date.now();
      cb(
        null,
        `${req.user.id}/${file.fieldname}-${timestamp}-${file.originalname}`
      );
    },
  }),
});

const router = express.Router();

const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string(),
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/profile/update", authMiddleware, async (req, res) => {
  const { name, phone } = req.body;

  try {
    const { error } = userRegisterSchema.validate({name,phone});
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await User.findById(req.user.id);

    user.name = name;
    user.phone = phone;

    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/password/update", authMiddleware, async (req, res) => {
  const { oldPassword, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const user = await User.findById(req.user.id).select("password");

    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    user.password = await hashPassword(password);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});

// Endpoint for profile image upload
router.put(
  "/profile-image",
  authMiddleware,
  upload.single("avatar"), // 'avatar' should match the field name in the form data
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const location = req.file.location;

      // Save the S3 file URL to the user model
      user.avatar = location; // S3 file URL
      await user.save();

      res.status(200).json({
        message: "Profile image updated successfully",
        url: location,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

// Endpoint for resume upload
router.put(
  "/resume",
  authMiddleware,
  upload.single("resume"), // 'resume' should match the field name in the form data
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Save the S3 file URL to the user model
      user.resume = req.file.location; // S3 file URL
      await user.save();

      res.status(200).json({
        message: "Resume uploaded successfully",
        url: req.file.location,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
