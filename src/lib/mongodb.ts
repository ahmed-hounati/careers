import mongoose, { ConnectOptions, Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

export async function connectDB(): Promise<Connection> {
  try {
    const opts: ConnectOptions = {
      bufferCommands: false,
    };

    const conn = await mongoose.connect(MONGODB_URI as string, opts);

    console.log("MongoDB Connected Successfully!");
    console.log("Connected to MongoDB:", conn.connection.host);

    // Listen for connection errors
    mongoose.connection.on("error", (err: Error) => {
      console.error("MongoDB connection error:", err);
    });

    // Listen for disconnection
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    // Listen for successful reconnection
    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

    return conn.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
