import { Schema } from 'mongoose';

export interface IDocumentthreadMessageFile {
  name: string;
  path: string;
}

export interface IDocumentthreadMessage {
  user_id?: Schema.Types.ObjectId;
  message?: string;
  createdAt?: Date;
  file?: IDocumentthreadMessageFile[];
  ignore_message?: boolean;
}

export interface IDocumentthread {
  student_id: Schema.Types.ObjectId;
  program_id?: Schema.Types.ObjectId;
  application_id?: Schema.Types.ObjectId;
  outsourced_user_id?: Schema.Types.ObjectId[];
  pin_by_user_id?: Schema.Types.ObjectId[];
  flag_by_user_id?: Schema.Types.ObjectId[];
  file_type: string;
  isFinalVersion?: boolean;
  isOriginAuthorDeclarationConfirmedByStudent?: boolean;
  isOriginAuthorDeclarationConfirmedByStudentTimestamp?: Date;
  messages?: IDocumentthreadMessage[];
  isEssayConsultantNeeded?: boolean;
  essayConsultantIds?: Schema.Types.ObjectId[];
  updatedAt?: Date;
}

export const documentThreadsSchema = new Schema<IDocumentthread>({
  student_id: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
  program_id: { type: Schema.Types.ObjectId, ref: 'Program' },
  application_id: { type: Schema.Types.ObjectId, ref: 'Application' },
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
  isEssayConsultantNeeded: {
    type: Boolean
  },
  essayConsultantIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  updatedAt: Date
});
