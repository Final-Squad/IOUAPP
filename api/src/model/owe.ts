import { Schema } from 'mongoose';
import User from './user';

const OweModel = new Schema({
  to: User,
  from: User,
  for: String,
  amount: Number,
  paid: Boolean,
}, { timestamps: { updatedAt: 'updated_at' } });

export default OweModel;
