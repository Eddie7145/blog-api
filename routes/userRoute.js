// User Routes
import express from "express";
import { followUser, getAllUsers, unfollowUser, updateUser } from "../controllers/usersController.js";
import { auth } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.put("/", auth, updateUser);
userRouter.post("/follow/:userId", followUser);
userRouter.post("/unfollow/:userId", unfollowUser);


export default userRouter;