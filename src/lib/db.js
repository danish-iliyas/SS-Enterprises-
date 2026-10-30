import mongoose from 'mongoose';

// Reuse one connection across hot reloads (dev) and warm serverless invocations (Vercel).
const cached = globalThis.__mongoose ?? (globalThis.__mongoose = { conn: null, promise: null });

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set. Add it to .env.local (or Vercel environment variables).');

  if (!cached.promise) {
    mongoose.set('strictQuery', true);
    cached.promise = mongoose.connect(uri, { bufferCommands: false, maxPoolSize: 10 });
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}
