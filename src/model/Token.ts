import { Schema } from 'mongoose';
import { IUser } from './User';

export interface IToken {
  userId: IUser | Schema.Types.ObjectId | string;
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
