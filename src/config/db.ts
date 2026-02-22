import mongoose from 'mongoose';
import { logger } from '../utils/logger';

/**
 * Connect to MongoDB
 */
export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(uri);
    logger.info('MongoDB Connected Successfully');
  } catch (error) {
    logger.error('MongoDB Connection Failed', error);
    // We don't exit the process here to allow the server to stay alive even if DB fails initially
    // In a strict production environment, you might want to process.exit(1)
  }
};
