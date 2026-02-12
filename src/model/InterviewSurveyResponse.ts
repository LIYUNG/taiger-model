import { Schema } from 'mongoose';
import { IStudent } from './User';
import { IProgram } from './Program';
import { IInterview } from './Interview';

export interface IInterviewSurveyResponseResponse {
  questionId?: string;
  answer?: number;
}

export interface IInterviewSurveyResponse {
  student_id?: IStudent | Schema.Types.ObjectId | string;
  interview_id?: IInterview | Schema.Types.ObjectId | string;
  program_id?: IProgram | Schema.Types.ObjectId | string;
  responses?: IInterviewSurveyResponseResponse[];
  isFinal?: boolean;
  interviewQuestions?: string;
  interviewFeedback?: string;
}

export const interviewSurveyResponseSchema = new Schema<IInterviewSurveyResponse>(
  {
    student_id: { type: Schema.Types.ObjectId, ref: 'User' },
    interview_id: { type: Schema.Types.ObjectId, ref: 'Interview' },
    program_id: { type: Schema.Types.ObjectId, ref: 'Program' },
    responses: [
      {
        questionId: String,
        answer: Number
      }
    ],
    isFinal: {
      type: Boolean
    },
    interviewQuestions: {
      type: String
    },
    interviewFeedback: {
      type: String
    }
  },
  { timestamps: true }
);
