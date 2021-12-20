import * as mongoose from 'mongoose';
import dotenv from 'dotenv';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      const config = {
        auth: {
          username: process.env.MONGO_USER,
          password: process.env.MONGO_PASS,
        },
        dbName: process.env.MONGO_DB,
        authSource: 'admin',
        autoIndex: true
      }

      return mongoose.connect('mongodb://localhost', process.env.NODE_ENV === 'development' ? {} : config);
    },
  },
];
