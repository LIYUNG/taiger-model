import { Schema } from 'mongoose';

export interface IInterview {
  student_id?: Schema.Types.ObjectId;
  trainer_id?: Schema.Types.ObjectId[];
  thread_id?: Schema.Types.ObjectId;
  program_id?: Schema.Types.ObjectId;
  event_id?: Schema.Types.ObjectId;
  interview_description?: string;
  interviewer?: string;
  interview_duration?: string;
  interview_date?: Date;
  isClosed?: boolean;
  start?: Date;
  end?: Date;
}

export const interviewsSchema = new Schema<IInterview>(
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
