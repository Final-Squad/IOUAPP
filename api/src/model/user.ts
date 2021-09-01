import { Schema } from 'mongoose';

const UserModel = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  owedTo: [],
  owedFrom: [],
}, { timestamps: { createdAt: 'created_at' } });

export default UserModel;
