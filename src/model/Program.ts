import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

export const PROGRAM_SUBJECTS = {
  LING: {
    label: 'Linguistics',
    category: 'AH'
  },
  MUS: {
    label: 'Music',
    category: 'AH'
  },
  THEO: {
    label: 'Theology, Divinity and Religious Studies',
    category: 'AH'
  },
  ARCH: {
    label: 'Archaeology',
    category: 'AH'
  },
  'ARCH-BE': {
    label: 'Architecture and Built Environment',
    category: 'AH'
  },
  'ART-DES': {
    label: 'Art and Design',
    category: 'AH'
  },
  CLAH: {
    label: 'Classics and Ancient History',
    category: 'AH'
  },
  ELL: {
    label: 'English Language and Literature',
    category: 'AH'
  },
  HIST: {
    label: 'History',
    category: 'AH'
  },
  ARTH: {
    label: 'Art History',
    category: 'AH'
  },
  'MOD-LANG': {
    label: 'Modern Languages',
    category: 'AH'
  },
  'PERF-ART': {
    label: 'Performing Arts',
    category: 'AH'
  },
  PHIL: {
    label: 'Philosophy',
    category: 'AH'
  },
  'CHEM-ENG': {
    label: 'Engineering - Chemical',
    category: 'ET'
  },
  'CIV-STR-ENG': {
    label: 'Engineering - Civil and Structural',
    category: 'ET'
  },
  CSIS: {
    label: 'Computer Science and Information Systems',
    category: 'ET'
  },
  'DS-AI': {
    label: 'Data Science and Artificial Intelligence',
    category: 'ET'
  },
  'ELEC-ENG': {
    label: 'Engineering - Electrical and Electronic',
    category: 'ET'
  },
  'PETRO-ENG': {
    label: 'Engineering - Petroleum',
    category: 'ET'
  },
  'MECH-ENG': {
    label: 'Engineering - Mechanical',
    category: 'ET'
  },
  'MIN-MIN-ENG': {
    label: 'Engineering - Mineral and Mining',
    category: 'ET'
  },
  'AG-FOR': {
    label: 'Agriculture and Forestry',
    category: 'LSM'
  },
  'ANA-PHYS': {
    label: 'Anatomy and Physiology',
    category: 'LSM'
  },
  'BIO-SCI': {
    label: 'Biological Sciences',
    category: 'LSM'
  },
  DENT: {
    label: 'Dentistry',
    category: 'LSM'
  },
  MED: {
    label: 'Medicine',
    category: 'LSM'
  },
  NURS: {
    label: 'Nursing',
    category: 'LSM'
  },
  PHARM: {
    label: 'Pharmacy and Pharmacology',
    category: 'LSM'
  },
  PSYCH: {
    label: 'Psychology',
    category: 'LSM'
  },
  'VET-SCI': {
    label: 'Veterinary Science',
    category: 'LSM'
  },
  CHEM: {
    label: 'Chemistry',
    category: 'NS'
  },
  'EAR-MAR-SCI': {
    label: 'Earth and Marine Sciences',
    category: 'NS'
  },
  'ENV-SCI': {
    label: 'Environmental Sciences',
    category: 'NS'
  },
  GEO: {
    label: 'Geography',
    category: 'NS'
  },
  GEOL: {
    label: 'Geology',
    category: 'NS'
  },
  GEOPH: {
    label: 'Geophysics',
    category: 'NS'
  },
  'MAT-SCI': {
    label: 'Materials Sciences',
    category: 'NS'
  },
  MATH: {
    label: 'Mathematics',
    category: 'NS'
  },
  'PHYS-ASTRO': {
    label: 'Physics and Astronomy',
    category: 'NS'
  },
  'ACC-FIN': {
    label: 'Accounting and Finance',
    category: 'SSM'
  },
  ANTH: {
    label: 'Anthropology',
    category: 'SSM'
  },
  'BUS-MGMT': {
    label: 'Business and Management Studies',
    category: 'SSM'
  },
  'COMM-MEDIA': {
    label: 'Communication and Media Studies',
    category: 'SSM'
  },
  'DEV-STUD': {
    label: 'Development Studies',
    category: 'SSM'
  },
  ECON: {
    label: 'Economics and Econometrics',
    category: 'SSM'
  },
  'EDU-TRAIN': {
    label: 'Education and Training',
    category: 'SSM'
  },
  'HOSP-MGMT': {
    label: 'Hospitality and Leisure Management',
    category: 'SSM'
  },
  LAW: {
    label: 'Law and Legal Studies',
    category: 'SSM'
  },
  'LIB-INFO': {
    label: 'Library and Information Management',
    category: 'SSM'
  },
  MKT: {
    label: 'Marketing',
    category: 'SSM'
  },
  POL: {
    label: 'Politics',
    category: 'SSM'
  },
  'SOC-POL': {
    label: 'Social Policy and Administration',
    category: 'SSM'
  },
  SOC: {
    label: 'Sociology',
    category: 'SSM'
  },
  SPORT: {
    label: 'Sports-Related Subjects',
    category: 'SSM'
  },
  'STAT-OR': {
    label: 'Statistics and Operational Research',
    category: 'SSM'
  }
};

export enum SemesterType {
  SummerSemester = 'SS',
  WinterSemester = 'WS',
  Rolling = 'Rolling'
}

enum Category {
  TU9 = 'TU9',
  U15 = 'U15',
  EUROTECH = 'EUROTECH',
  GERMAN_ELITE = 'GERMAN_ELITE',
  TOP50 = 'TOP50',
  TIME = 'TIME',
  TOP100 = 'TOP100',
  TOP150 = 'TOP150',
  TOP250 = 'TOP250',
  TOP500 = 'TOP500'
}

export const DIFFICULTY = {
  EASY: 'EASY',
  HARD: 'HARD'
};

export const SCHOOL_TAGS = {
  [Category.U15]: {
    label: 'U15',
    category: 'U15'
  },
  [Category.TU9]: {
    label: 'TU9 German Universities of Technology',
    category: 'TU9'
  },
  [Category.EUROTECH]: {
    label: 'EuroTech Universities Alliance',
    category: 'EUROTECH'
  },
  [Category.GERMAN_ELITE]: {
    label: 'German Excellence Initiative',
    category: 'GERMAN_ELITE'
  },
  [Category.TIME]: {
    label: 'Top International Managers in Engineering',
    category: 'TIME'
  },
  [Category.TOP50]: {
    label: 'QS Top 50 Universities',
    category: 'TOP50'
  },
  [Category.TOP100]: {
    label: 'QS Top 100 Universities',
    category: 'TOP100'
  },
  [Category.TOP150]: {
    label: 'QS Top 150 Universities',
    category: 'TOP150'
  },
  [Category.TOP250]: {
    label: 'QS Top 250 Universities',
    category: 'TOP150'
  },
  [Category.TOP500]: {
    label: 'QS Top 500 Universities',
    category: 'TOP500'
  }
};


export enum SchoolType {
  University = 'University',
  University_of_Applied_Sciences = 'University_of_Applied_Sciences'
}

export const SCHOOL_TYPES: SchoolType[] = [
  SchoolType.University,
  SchoolType.University_of_Applied_Sciences
];
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
