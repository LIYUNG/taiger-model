import { Schema } from 'mongoose';

export const intervalSchema = new Schema({
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
