import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let client: MongoClient | null = null;

export async function dbConnect() {
  if (client) {
    return client.db();
  }

  try {
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    return client.db();
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw new Error('Database connection failed');
  }
} 