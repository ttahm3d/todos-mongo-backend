import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING!);
    console.log("[connect.ts] Connected to database");
  } catch (error) {
    console.error(
      "[connect] Could not establish a connection with database",
      error
    );
  }
};

export { connectToDb };
