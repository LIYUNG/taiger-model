import { Schema } from 'mongoose';

const contentType = ['sentence', 'paragraph', 'essay'];
const STUDENT_INPUT_STATUS_E = {
  EMPTY: 'empty',
  PRODIVDED: 'provided',
  GENERATED: 'generated',
  BLOCKED: 'blocked'
};

export const surveyInputSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    immutable: true,
    required: true,
    ref: 'User'
  },
  programId: { type: Schema.Types.ObjectId, immutable: true, ref: 'Program' },
  fileType: {
    type: String,
    immutable: true,
    required: true
  },
  isFinalVersion: {
    type: Boolean,
    default: false
  },
  surveyContent: [
    {
      _id: false,
      questionId: String,
      question: String,
      answer: String,
      type: {
        type: String,
        enum: ['word', 'sentence', 'paragraph', 'essay']
      },
      contentType: { type: String, enum: contentType }
    }
  ],
  surveyStatus: {
    type: String,
    enum: Object.values(STUDENT_INPUT_STATUS_E),
    default: STUDENT_INPUT_STATUS_E.EMPTY
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  }
});
