import { Schema } from 'mongoose';

export const documentThreadsSchema = {
  student_id: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
  program_id: { type: Schema.Types.ObjectId, ref: 'Program' },
  outsourced_user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  pin_by_user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  flag_by_user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  file_type: { type: String, require: true }, // Change to threadType
  isFinalVersion: {
    type: Boolean,
    default: false
  },
  isOriginAuthorDeclarationConfirmedByStudent: {
    type: Boolean,
    default: false
  },
  isOriginAuthorDeclarationConfirmedByStudentTimestamp: Date,
  messages: [
    {
      user_id: { type: Schema.Types.ObjectId, ref: 'User' },
      message: {
        type: String,
        default: ''
      },
      createdAt: Date,
      file: [
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
      ignore_message: Boolean
    }
  ],
  updatedAt: Date
};
