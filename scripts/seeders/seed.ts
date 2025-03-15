import 'dotenv/config';
import mongoose from 'mongoose';

import { seedDiseaseTypes } from './disease-type.js';

const uri = process.env.MONGO_URI as string;

async function seedDatabase() {
  try {
    // Connect to MongoDB using Mongoose
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Seed the database
    await seedDiseaseTypes();
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ MongoDB connection failed:', error.message);
    } else {
      console.error('❌ MongoDB connection failed:', error);
    }
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
}

seedDatabase();
