import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const connectionString = process.env.DB_CONNECTION_STRING!;
    await mongoose.connect(connectionString, {});
    console.log("[connect.ts] Connected to database");
  } catch (error) {
    console.error(
      "[connect] Could not establish a connection with database",
      error
    );
  }
};

export { connectToDb };
