// Post CRUD
import { Post } from "../models/postModel.js";
import { User } from "../models/userModel.js";

export const createPost = async (req, res) => {
  try {
      console.log("User ID:", req.userId); // Debugging

      if (!req.userId) {
          return res.status(401).json({ error: "Unauthorized: User ID is missing" });
      }

      const { title, content, tags } = req.body;
      const post = new Post({ title, content, tags, author: req.userId });
      await post.save();
      
      res.status(201).json(post);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username"); // Populate author details
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const { query } = req.query;
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive search
        { tags: { $in: [query] } }, // Search by tags
        { author: { $in: await User.find({ username: { $regex: query, $options: 'i' } }).select('_id') } }, // Search by author
      ],
    }).populate('author', 'username');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search posts' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.userId, // Ensure the post belongs to the authenticated user
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.userId }, // Ensure the post belongs to the authenticated user
      { title, content, tags },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};