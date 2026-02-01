import { Schema } from 'mongoose';

export interface IToken {
  userId: Schema.Types.ObjectId;
  value: string;
  createdAt?: Date;
}

export const tokenSchema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  value: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '20m'
  }
});
