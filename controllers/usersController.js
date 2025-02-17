// User profile & follow
import { User } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const followUser = async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndUpdate(req.userId, {
    $addToSet: { following: userId },
  });
  await User.findByIdAndUpdate(userId, {
    $addToSet: { followers: req.userId },
  });
  res.json({ message: "Followed successfully" });
};

export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(req.userId, { $pull: { following: userId } });
    await User.findByIdAndUpdate(userId, { $pull: { followers: req.userId } });
    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to unfollow user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { username, email },
      { new: true }
    ).select("-password"); // Exclude password field
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};
