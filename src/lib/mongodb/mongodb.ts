import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

let cached: mongoose.Mongoose | undefined;

async function dbConnect() {
  if (cached) {
    return cached;
  }

  try {
    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }
    const db = await mongoose.connect(uri);
    cached = db;
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export default dbConnect;
