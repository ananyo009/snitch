import mongoose from "mongoose";
import congfig from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(congfig.mongo_uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDB;