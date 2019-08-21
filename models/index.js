import mongoose from 'mongoose';
import { env } from '../helpers/utils';

const url = env('DATABASE_URL');
const options = {
  reconnectTries: 100,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useCreateIndex: true,
};

/**
 * Establish database connection
 */
const connectDb = () => mongoose.connect(url, options);

export default connectDb;
