// Server Entry
import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './config/db.js'
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';
import commentRouter from './routes/commentRoute.js';
import authRouter from './routes/authRoute.js';


// Load environment variables from .env file
dotenv.config();

// Connectionto mongodb
dbConnect();

// Intialize Express App
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Defining APP Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

// Starting the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});