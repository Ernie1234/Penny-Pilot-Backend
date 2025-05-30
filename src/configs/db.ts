import mongoose from "mongoose";
import env from "./envConfig";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const conn = await mongoose.connect(env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });

    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export const disconnectDB = async () => {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log("MongoDB disconnected");
  }
};

// Optional: Auto-reconnect on connection loss
mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.log("MongoDB disconnected - attempting to reconnect...");
  setTimeout(connectDB, 3000);
});
