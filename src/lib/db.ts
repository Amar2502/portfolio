import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

interface MongooseConnection {
  conn: mongoose.Mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as typeof global & {
  mongoose?: MongooseConnection;
};

let cached: MongooseConnection = { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      connectTimeoutMS: 10000,
      retryWrites: true,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts)
      .then((mongooseInstance) => {
        console.log("MongoDB Connected Successfully");
        cached.conn = mongooseInstance;
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("MongoDB Connection Failed:", error);
        throw error;
      });
  }

  try {
    const mongooseInstance = await cached.promise;
    return mongooseInstance;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}