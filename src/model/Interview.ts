import { Schema } from 'mongoose';
import { IUser } from './User';
import { IStudent } from './User';
import { IProgram } from './Program';
import { IDocumentthread } from './Documentthread';
import { IEvent } from './Event';

export interface IInterview {
  student_id?: IStudent | Schema.Types.ObjectId | string;
  trainer_id?: IUser[] | Schema.Types.ObjectId[] | string[];
  thread_id?: IDocumentthread | Schema.Types.ObjectId | string;
  program_id?: IProgram | Schema.Types.ObjectId | string;
  event_id?: IEvent | Schema.Types.ObjectId | string;
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
