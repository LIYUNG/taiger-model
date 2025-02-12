import { Schema } from 'mongoose';

export const interviewSurveyResponseSchema = new Schema(
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
