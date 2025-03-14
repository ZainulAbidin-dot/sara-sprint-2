import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI as string;

const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ MongoDB connection failed:', error.message);
    } else {
      console.error('❌ MongoDB connection failed:', error);
    }
  } 
};

export default connectDB;
