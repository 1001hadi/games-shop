import mongoose from "mongoose";
import dotenv from "dotenv";

// setup
dotenv.config();

// connect
const connStr = process.env.mongoURI;
async function connectDB() {
  try {
    await mongoose.connect(connStr);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
export default connectDB;
