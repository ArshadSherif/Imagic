/* eslint-disable @typescript-eslint/no-namespace */
import mongoose, { Mongoose } from 'mongoose';

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // Augment the global object to include the cached connection
  namespace NodeJS {
    interface Global {
      mongoose: Cached;
    }
  }
}

const globalWithMongoose = global as typeof global & { mongoose: Cached };

const cached: Cached = globalWithMongoose.mongoose || { conn: null, promise: null };

export const connectToDatabase = async (): Promise<Mongoose> => {
  // Return cached connection if it exists
  if (cached.conn) return cached.conn;

  // Throw an error if MONGODB_URL is not defined
  const MONGODB_URL = process.env.MONGODB_URL;
  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  // Create a new connection promise if it doesn't exist
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: 'Imagic',
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('Mongoose connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('Mongoose connection error:', error);
      throw error; // Re-throw to handle upstream
    });
  }

  // Await the connection promise and cache the connection
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error('Error awaiting mongoose connection promise:', error);
    throw error;
  }

  return cached.conn;
};