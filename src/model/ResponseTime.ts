import { Schema } from 'mongoose';
import { IDocumentthread } from './Documentthread';
import { IStudent } from './User';

export interface IResponseTime {
  thread_id?: IDocumentthread | Schema.Types.ObjectId | string;
  student_id?: IStudent | Schema.Types.ObjectId | string;
  interval_type: string;
  intervalAvg: number;
  updatedAt?: Date;
}

export const ResponseTimeSchema = new Schema<IResponseTime>({
  thread_id: {
    type: Schema.Types.ObjectId,
    ref: 'Documentthread'
  },
  student_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  interval_type: {
    type: String,
    required: true
  },
  intervalAvg: {
    type: Number,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    expires: 93312000 // 3 years
  }
});
