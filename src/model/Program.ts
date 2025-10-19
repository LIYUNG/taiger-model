import { Schema } from 'mongoose';
import {
  DIFFICULTY,
  PROGRAM_SUBJECTS,
  SCHOOL_TAGS,
  SCHOOL_TYPES
} from '@taiger-common/core';

const { ObjectId } = Schema.Types;

const SCHOOL_TAG_KEYS = Object.keys(SCHOOL_TAGS);
export const PROGRAM_SUBJECT_KEYS = Object.keys(PROGRAM_SUBJECTS);
export const DIFFICULTY_KEYS = Object.keys(DIFFICULTY);

export const programModule = {
  isArchiv: Boolean,
  school: {
    type: String,
    default: '',
    required: true
  },
  program_name: {
    type: String,
    required: true
  },
  programSubjects: [
    {
      type: String,
      enum: PROGRAM_SUBJECT_KEYS
    }
  ],
  degree: {
    type: String
    // enum: Object.values(Degree),
  },
  semester: String, // TODO: enum?
  lang: {
    type: String
    // enum: Object.values(Languages)
  },
  gpa_requirement: {
    type: String
  },
  allowOnlyGraduatedApplicant: {
    type: Boolean,
    default: false
  },
  application_start: String,
  application_deadline: {
    type: String
  },
  uni_assist: {
    type: String
  },
  englishTestHandLater: {
    type: Boolean,
    default: false
  },
  toefl: {
    type: String
  },
  toefl_reading: {
    type: Number
  },
  toefl_listening: {
    type: Number
  },
  toefl_writing: {
    type: Number
  },
  toefl_speaking: {
    type: Number
  },
  ielts: {
    type: String
  },
  ielts_reading: {
    type: Number
  },
  ielts_listening: {
    type: Number
  },
  ielts_writing: {
    type: Number
  },
  ielts_speaking: {
    type: Number
  },
  germanTestHandLater: {
    type: Boolean,
    default: false
  },
  goetheZertifikat: {
    type: String
  },
  testdaf: {
    type: String
  },
  dsh: {
    type: String
  },
  gre: {
    type: String
  },
  gre_verbal: {
    type: Number
  },
  gre_quantitative: {
    type: Number
  },
  gre_analytical_writing: {
    type: Number
  },
  gmat: {
    type: String
  },
  ml_required: {
    type: String
  },
  ml_requirements: {
    type: String
  },
  // statement of purpose
  sop_required: {
    type: String
  },
  sop_requirements: {
    type: String
  },
  // personal history of statement
  phs_required: {
    type: String
  },
  phs_requirements: {
    type: String
  },
  rl_required: {
    type: String
  },
  rl_requirements: {
    type: String
  },
  is_rl_specific: {
    type: Boolean
  },
  essay_required: {
    type: String
  },
  essay_requirements: {
    type: String
  },
  essay_difficulty: {
    type: String,
    enum: DIFFICULTY_KEYS
  },
  portfolio_required: {
    type: String
  },
  portfolio_requirements: {
    type: String
  },
  supplementary_form_required: {
    type: String
  },
  supplementary_form_requirements: {
    type: String
  },
  curriculum_analysis_required: {
    type: String
  },
  curriculum_analysis_requirements: {
    type: String
  },
  scholarship_form_required: {
    type: String
  },
  scholarship_form_requirements: {
    type: String
  },
  module_description_required: {
    type: String
  },
  ects_requirements: {
    type: String
  },
  special_notes: {
    type: String
  },
  comments: {
    type: String
  },
  application_portal_a: {
    type: String
  },
  application_portal_b: {
    type: String
  },
  application_portal_a_instructions: {
    type: String
  },
  application_portal_b_instructions: {
    type: String
  },
  uni_assist_link: {
    type: String
  },
  website: {
    type: String
  },
  fpso: {
    type: String
  },
  updatedAt: Date,
  whoupdated: {
    type: String
  },
  tuition_fees: {
    type: String
  },
  contact: {
    type: String
  },
  city: {
    type: String,
    default: ''
  },
  country: {
    type: String
  },
  isPrivateSchool: {
    type: Boolean
  },
  isPartnerSchool: {
    type: Boolean
  },
  schoolType: {
    type: String,
    enum: SCHOOL_TYPES
  },
  isEssayConsultantNeeded: {
    type: Boolean,
    default: false
  },
  tags: [
    {
      type: String,
      enum: SCHOOL_TAG_KEYS
    }
  ],
  url: String,
  isNC: {
    type: Boolean,
    default: false
  },
  zipCode: {
    type: String,
    default: ''
  },
  vcId: ObjectId
};

export const programSchema = new Schema(programModule, { timestamps: true });
