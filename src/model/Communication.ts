import { Schema } from 'mongoose';

export interface ICommunicationFile {
  name: string;
  path: string;
}

export interface ICommunication {
  student_id?: Schema.Types.ObjectId;
  user_id?: Schema.Types.ObjectId;
  message?: string;
  readBy?: Schema.Types.ObjectId[];
  timeStampReadBy?: Schema.Types.Mixed;
  files?: ICommunicationFile[];
  createdAt?: Date;
  ignore_message?: boolean;
  ignoredMessageUpdatedAt?: Date;
  ignoredMessageBy?: Schema.Types.ObjectId;
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
