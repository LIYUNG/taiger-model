import { Schema } from 'mongoose';
import { IUser } from './User';
import { IStudent } from './User';

export interface ICommunicationFile {
  name: string;
  path: string;
}

export interface ICommunication {
  student_id?: IStudent | Schema.Types.ObjectId | string;
  user_id?: IUser | Schema.Types.ObjectId | string;
  message?: string;
  readBy?: IUser[] | Schema.Types.ObjectId[] | string[];
  timeStampReadBy?: Schema.Types.Mixed;
  files?: ICommunicationFile[];
  createdAt?: Date;
  ignore_message?: boolean;
  ignoredMessageUpdatedAt?: Date;
  ignoredMessageBy?: IUser | Schema.Types.ObjectId | string;
}

export const communicationsSchema = new Schema<ICommunication>(
  {
    student_id: { type: Schema.Types.ObjectId, ref: 'User' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    message: {
      type: String,
      default: ''
    },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    timeStampReadBy: Schema.Types.Mixed,
    files: [
      {
        name: {
          type: String,
          required: true
        },
        path: {
          type: String,
          required: true
        }
      }
    ],
    createdAt: Date,
    ignore_message: Boolean,
    ignoredMessageUpdatedAt: Date,
    ignoredMessageBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);
