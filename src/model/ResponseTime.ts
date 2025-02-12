import { Schema } from 'mongoose';

export const ResponseTimeSchema = new Schema({
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
