import { Schema } from 'mongoose';

import { PROGRAM_SUBJECT_KEYS } from '../model/Program';

export interface IProgramrequirementProgramCategory {
  program_category?: string;
  category_description?: string;
  requiredECTS?: number;
  keywordSets?: Schema.Types.ObjectId[];
  maxScore?: number;
}

export interface IProgramrequirement {
  programId?: Schema.Types.ObjectId[];
  program_categories?: IProgramrequirementProgramCategory[];
  attributes?: string[];
  fpso?: string;
  admissionDescription?: string;
  gpaScoreBoundaryGPA?: number;
  gpaScore?: number;
  gpaMinScore?: number;
  coursesScore?: number;
  cvScore?: number;
  mlScore?: number;
  rlScore?: number;
  essayScore?: number;
  gmatScore?: number;
  greScore?: number;
  interviewScore?: number;
  workExperienceScore?: number;
  testScore?: number;
  firstRoundConsidered?: string[];
  secondRoundConsidered?: string[];
  directRejectionScore?: number;
  directAdmissionScore?: number;
  directRejectionSecondScore?: number;
  directAdmissionSecondScore?: number;
}

export const programRequirementSchema = new Schema<IProgramrequirement>(
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
    workExperienceScore: {
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
