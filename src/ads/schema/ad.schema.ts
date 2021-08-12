import * as mongoose from 'mongoose';

export const AdSchema = new mongoose.Schema(
  {
    test: { type: String, required: true },
  },
  { timestamps: true },
);
