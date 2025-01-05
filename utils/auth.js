import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (inputPassword, storedHash) => {
  return await bcrypt.compare(inputPassword, storedHash);
};

export const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const setTokenCookie = (res, token) => {
  res.cookie("jwt", token, {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
  });
}