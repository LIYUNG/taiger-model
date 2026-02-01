import { Schema } from 'mongoose';

export interface IInterviewSurveyResponseResponse {
  questionId?: string;
  answer?: number;
}

export interface IInterviewSurveyResponse {
  student_id?: Schema.Types.ObjectId;
  interview_id?: Schema.Types.ObjectId;
  program_id?: Schema.Types.ObjectId;
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
