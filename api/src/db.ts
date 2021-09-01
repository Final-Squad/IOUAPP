import mongoose, { Model, Schema } from 'mongoose';
import User, { Owe } from './types/common-interfaces';
import UserModel from './model/user';
import OweModel from './model/owe';
const logger = require('../logger/logger');

export default class DB {
  user: Model<User>;
  owe: Model<Owe>;

  constructor() {
    this.user = mongoose.model<User>('User', UserModel);
    this.owe = mongoose.model<Owe>('Owe', OweModel);
  }

  public static connect() {
    mongoose.connect(
      process.env.NODE_ENV === 'development'
      ? process.env.MONGO_URI_DEV || 'null'
      : process.env.MONGO_URI_PROD || 'null'
    ).then(() => {
      logger.info({
        message: 'CONNECTED TO DATABASE ✅',
        service: 'database',
        environment: process.env.NODE_ENV
      }
    )}).catch(() => logger.error({
      message: 'CANNOT CONNECT TO DATABASE ❌',
      service: 'database',
      environment: process.env.NODE_ENV
    }));
  }

  close() {
    mongoose.connection.close();
    logger.debug(`CONNECTION CLOSED ✌🏽`);
  }
}
