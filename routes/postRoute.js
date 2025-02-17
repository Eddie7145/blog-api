// Post Routes
import express from "express";
import { createPost, deletePost, getAllPosts, getPostById, searchPosts, updatePost } from "../controllers/postController.js";
import { auth } from "../middleware/auth.js";

const postRouter = express.Router();

postRouter.post("/", auth, createPost);
postRouter.get("/", getAllPosts);
postRouter.get("/search", searchPosts);
postRouter.get("/:id", getPostById);
postRouter.put("/:id", auth, updatePost);
postRouter.delete("/:id", auth, deletePost);

export default postRouter;