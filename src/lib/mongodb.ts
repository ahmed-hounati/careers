import mongoose, { Connection, ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB(): Promise<Connection | null> {
  if (process.env.IS_BUILD === "true") {
    console.log("Skipping MongoDB connection during the build process");
    return null;
  }

  try {
    const opts: ConnectOptions = {
      bufferCommands: false,
    };

    const conn = await mongoose.connect(MONGODB_URI as string, opts);

    console.log("MongoDB Connected Successfully!");
    console.log("Connected to MongoDB:", conn.connection.host);

    // Listen for connection events
    mongoose.connection.on("error", (err: Error) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

    return conn.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
