import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean },
    isEmailConfirmed: { type: Boolean },
    phone: { type: String },
  },
  { timestamps: true },
);

UserSchema.index({ username: 1 }, { unique: true });
