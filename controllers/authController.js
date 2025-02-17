// Auth Logic
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ 
    _id: user._id,
    username: user.username,
    email: user.email,
    followers: user.followers,
    following: user.following
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ 
    _id: user._id,
    email: user.email,
    token
  });
};
