// Comment Routes
import express from "express";
import { addComment, deleteComment, getAllComments, updateComment } from "../controllers/commentController.js";
import { auth } from "../middleware/auth.js";

const commentRouter = express.Router();

commentRouter.post("/", auth, addComment);
commentRouter.get("/:postId", getAllComments);
commentRouter.put("/:id", auth, updateComment);
commentRouter.delete("/:id", auth, deleteComment);

export default commentRouter;