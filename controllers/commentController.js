// Comment CRUD
import { Comment } from "../models/commentModel.js";

export const addComment = async (req, res) => {
  const { text, postId } = req.body;
  const comment = new Comment({ text, author: req.userId, post: postId });
  await comment.save();
  res.status(201).json(comment);
};

export const getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username"
    );
    console.log(comments);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const updateComment = async (req, res) => {
  try {
    // Log the incoming values for debugging
    console.log("Request Body:", req.body); // Log the body of the request
    console.log("Comment ID from URL:", req.params.id);
    console.log("User ID from Auth:", req.userId);
    
    // Attempt to update the comment
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: req.params.id, author: req.userId },
      { text: req.body.text }, // Assuming 'text' is the field you want to update
      { new: true } // Returns the updated comment
    );

    // Log the result of the update attempt
    console.log("Updated Comment:", updatedComment);

    // If no comment was found, return a 404 error
    if (!updatedComment) {
      console.log("No comment found or unauthorized attempt");
      return res.status(404).json({ error: "Comment not found or unauthorized" });
    }

    // Successfully updated
    res.status(200).json(updatedComment);
  } catch (err) {
    console.error("Error while updating comment:", err);
    res.status(500).json({ error: "Failed to update comment" });
  }
};


export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      author: req.userId, // Ensure the comment belongs to the authenticated user
    });
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
