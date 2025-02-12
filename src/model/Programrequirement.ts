import { Schema } from 'mongoose';

import { PROGRAM_SUBJECT_KEYS } from '../model/Program';

export const programRequirementSchema = new Schema(
  {
    programId: [{ type: Schema.Types.ObjectId, ref: 'Program' }],
    program_categories: [
      {
        program_category: {
          type: String,
          default: ''
        },
        category_description: {
          type: String,
          default: ''
        },
        requiredECTS: {
          type: Number,
          default: 0
        },
        keywordSets: [{ type: Schema.Types.ObjectId, ref: 'KeywordSet' }],
        maxScore: {
          type: Number,
          default: 0
        }
      }
    ],
    attributes: [
      {
        type: String,
        enum: PROGRAM_SUBJECT_KEYS
      }
    ],
    fpso: {
      type: String
    },
    admissionDescription: {
      type: String,
      default: ''
    },
    gpaScoreBoundaryGPA: {
      type: Number,
      default: 0
    },
    // max.
    gpaScore: {
      type: Number,
      default: 0
    },
    // min. score at gpaScoreBoundaryGPA. Some program has offset instead of 0
    gpaMinScore: {
      type: Number,
      default: 0
    },
    coursesScore: {
      type: Number,
      default: 0
    },
    cvScore: {
      type: Number,
      default: 0
    },
    mlScore: {
      type: Number,
      default: 0
    },
    rlScore: {
      type: Number,
      default: 0
    },
    essayScore: {
      type: Number,
      default: 0
    },
    gmatScore: {
      type: Number,
      default: 0
    },
    greScore: {
      type: Number,
      default: 0
    },
    interviewScore: {
      type: Number,
      default: 0
    },
    testScore: {
      type: Number,
      default: 0
    },
    firstRoundConsidered: [
      {
        type: String
      }
    ],
    secondRoundConsidered: [
      {
        type: String
      }
    ],
    directRejectionScore: {
      type: Number,
      default: 0
    },
    directAdmissionScore: {
      type: Number,
      default: 0
    },
    directRejectionSecondScore: {
      type: Number,
      default: 0
    },
    directAdmissionSecondScore: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
