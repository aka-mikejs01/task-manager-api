import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to Database!");
  } catch (err) {
    console.log("DB died. I'm out.");
    process.exit(1);
  }
};

export default connectDB;
