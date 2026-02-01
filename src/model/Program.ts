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

export interface IProgram {
  isArchiv?: boolean;
  isLocked?: boolean;
  school: string;
  program_name: string;
  programSubjects?: string[];
  degree?: string;
  semester?: string;
  lang?: string;
  gpa_requirement?: string;
  allowOnlyGraduatedApplicant?: boolean;
  application_start?: string;
  application_deadline?: string;
  uni_assist?: string;
  englishTestHandLater?: boolean;
  toefl?: string;
  toefl_reading?: number;
  toefl_listening?: number;
  toefl_writing?: number;
  toefl_speaking?: number;
  ielts?: string;
  ielts_reading?: number;
  ielts_listening?: number;
  ielts_writing?: number;
  ielts_speaking?: number;
  germanTestHandLater?: boolean;
  goetheZertifikat?: string;
  testdaf?: string;
  dsh?: string;
  gre?: string;
  gre_verbal?: number;
  gre_quantitative?: number;
  gre_analytical_writing?: number;
  gmat?: string;
  ml_required?: string;
  ml_requirements?: string;
  sop_required?: string;
  sop_requirements?: string;
  phs_required?: string;
  phs_requirements?: string;
  rl_required?: string;
  rl_requirements?: string;
  is_rl_specific?: boolean;
  essay_required?: string;
  essay_requirements?: string;
  essay_difficulty?: string;
  portfolio_required?: string;
  portfolio_requirements?: string;
  supplementary_form_required?: string;
  supplementary_form_requirements?: string;
  curriculum_analysis_required?: string;
  curriculum_analysis_requirements?: string;
  scholarship_form_required?: string;
  scholarship_form_requirements?: string;
  module_description_required?: string;
  ects_requirements?: string;
  special_notes?: string;
  comments?: string;
  application_portal_a?: string;
  application_portal_b?: string;
  application_portal_a_instructions?: string;
  application_portal_b_instructions?: string;
  uni_assist_link?: string;
  website?: string;
  fpso?: string;
  updatedAt?: Date;
  whoupdated?: string;
  tuition_fees?: string;
  contact?: string;
  city?: string;
  country?: string;
  isPrivateSchool?: boolean;
  isPartnerSchool?: boolean;
  schoolType?: string;
  isEssayConsultantNeeded?: boolean;
  tags?: string[];
  url?: string;
  isNC?: boolean;
  zipCode?: string;
  vcId?: Schema.Types.ObjectId;
}

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

export const programSchema = new Schema<IProgram>(programModule, {
  timestamps: true
});
