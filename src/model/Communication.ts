import { Schema } from 'mongoose';

export const communicationsSchema = {
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
};
