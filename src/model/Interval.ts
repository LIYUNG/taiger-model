import { Schema } from 'mongoose';

export interface IInterval {
  thread_id?: Schema.Types.ObjectId;
  student_id?: Schema.Types.ObjectId;
  message_1_id: Schema.Types.ObjectId;
  message_2_id: Schema.Types.ObjectId;
  interval_type: string;
  interval: number;
  intervalStartAt: Date;
  updatedAt?: Date;
}

export const intervalSchema = new Schema<IInterval>({
  thread_id: {
    type: Schema.Types.ObjectId,
    ref: 'Documentthread'
  },
  student_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message_1_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  message_2_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  interval_type: {
    type: String,
    required: true
  },
  interval: {
    type: Number,
    required: true
  },
  intervalStartAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    expires: 93312000 // 3 years
  }
});
