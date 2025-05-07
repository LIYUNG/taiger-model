import { Schema } from 'mongoose';

export const interviewsSchema = new Schema(
  {
    student_id: { type: Schema.Types.ObjectId, ref: 'User' },
    trainer_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    thread_id: { type: Schema.Types.ObjectId, ref: 'Documentthread' },
    program_id: { type: Schema.Types.ObjectId, ref: 'Program' },
    event_id: { type: Schema.Types.ObjectId, ref: 'Event' },
    interview_description: {
      type: String,
      default: ''
    },
    interviewer: {
      type: String,
      default: ''
    },
    interview_duration: {
      type: String,
      default: ''
    },
    interview_date: {
      type: Date
    },
    isClosed: {
      type: Boolean,
      default: false
    },
    start: {
      type: Date
    },
    end: {
      type: Date
    }
  },
  { timestamps: true }
);
