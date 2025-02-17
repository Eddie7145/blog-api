// MongoDB Connection
import mongoose from "mongoose";

export const dbConnect = () => mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Database Connected")).catch((error) => {
    console.error("MongoDb Connection Error", error);
});