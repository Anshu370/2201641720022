import mongoose from "mongoose";
import logToAffordmed from "../controllers/log.js";
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logToAffordmed("backend", 'info', 'db', 'Connected to MongoDB successfully');
    } catch (error) {
        logToAffordmed("backend", 'error', 'db', `Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};