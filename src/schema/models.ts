/**
 * Zod schemas for base model data shapes (API-safe, no Mongoose-specific types).
 * Used by serialized.ts and API response schemas.
 */
import { z } from 'zod';

// =========== User Sub-schemas ===========

export const UserNotificationSchema = z.object({
  isRead_survey_not_complete: z.boolean().optional(),
  isRead_uni_assist_task_assigned: z.boolean().optional(),
  isRead_new_agent_assigned: z.boolean().optional(),
  isRead_new_editor_assigned: z.boolean().optional(),
  isRead_new_cvmlrl_tasks_created: z.boolean().optional(),
  isRead_new_cvmlrl_messsage: z.boolean().optional(),
  isRead_base_documents_missing: z.boolean().optional(),
  isRead_base_documents_rejected: z.boolean().optional(),
  isRead_new_programs_assigned: z.boolean().optional()
});
export type IUserNotificationSchema = z.infer<typeof UserNotificationSchema>;

export const UserTaigeraiFileSchema = z.object({
  name: z.string().optional(),
  status: z.string().optional(),
  file_category: z.string().optional(),
  path: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IUserTaigeraiFileSchema = z.infer<typeof UserTaigeraiFileSchema>;

export const UserTaigeraiFeedbackSchema = z.object({
  message: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IUserTaigeraiFeedbackSchema = z.infer<typeof UserTaigeraiFeedbackSchema>;

export const UserTaigeraiSchema = z.object({
  input: UserTaigeraiFileSchema.optional(),
  output: UserTaigeraiFileSchema.optional(),
  feedback: UserTaigeraiFeedbackSchema.optional()
});
export type IUserTaigeraiSchema = z.infer<typeof UserTaigeraiSchema>;

export const UserApplicationPreferenceSchema = z.object({
  expected_application_date: z.string().optional(),
  expected_application_semester: z.string().optional(),
  target_program_language: z.string().optional(),
  target_application_field: z.string().optional(),
  targetApplicationSubjects: z.array(z.string()).optional(),
  target_degree: z.string().optional(),
  considered_privat_universities: z.string().optional(),
  special_wished: z.string().optional(),
  application_outside_germany: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IUserApplicationPreferenceSchema = z.infer<typeof UserApplicationPreferenceSchema>;

export const UserAcademicBackgroundUniversitySchema = z.object({
  high_school_isGraduated: z.string().optional(),
  attended_high_school: z.string().optional(),
  high_school_graduated_year: z.string().optional(),
  attended_university: z.string().optional(),
  attended_university_program: z.string().optional(),
  isGraduated: z.string().optional(),
  expected_grad_date: z.string().optional(),
  Highest_GPA_Uni: z.number().optional(),
  Passing_GPA_Uni: z.number().optional(),
  My_GPA_Uni: z.number().optional(),
  Has_Exchange_Experience: z.string().optional(),
  isSecondGraduated: z.string().optional(),
  expectedSecondDegreeGradDate: z.string().optional(),
  attendedSecondDegreeUniversity: z.string().optional(),
  attendedSecondDegreeProgram: z.string().optional(),
  highestSecondDegreeGPA: z.number().optional(),
  passingSecondDegreeGPA: z.number().optional(),
  mySecondDegreeGPA: z.number().optional(),
  Has_Internship_Experience: z.string().optional(),
  Has_Working_Experience: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IUserAcademicBackgroundUniversitySchema = z.infer<typeof UserAcademicBackgroundUniversitySchema>;

export const UserAcademicBackgroundLanguageSchema = z.object({
  english_isPassed: z.string().optional(),
  english_certificate: z.string().optional(),
  english_score: z.string().optional(),
  english_score_reading: z.string().optional(),
  english_score_listening: z.string().optional(),
  english_score_writing: z.string().optional(),
  english_score_speaking: z.string().optional(),
  english_test_date: z.string().optional(),
  german_isPassed: z.string().optional(),
  german_certificate: z.string().optional(),
  german_score: z.string().optional(),
  german_test_date: z.string().optional(),
  gre_isPassed: z.string().optional(),
  gre_certificate: z.string().optional(),
  gre_score: z.string().optional(),
  gre_test_date: z.string().optional(),
  gmat_isPassed: z.string().optional(),
  gmat_certificate: z.string().optional(),
  gmat_score: z.string().optional(),
  gmat_test_date: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IUserAcademicBackgroundLanguageSchema = z.infer<typeof UserAcademicBackgroundLanguageSchema>;

export const UserAcademicBackgroundSchema = z.object({
  university: UserAcademicBackgroundUniversitySchema.optional(),
  language: UserAcademicBackgroundLanguageSchema.optional()
});
export type IUserAcademicBackgroundSchema = z.infer<typeof UserAcademicBackgroundSchema>;

export const UserAttributeSchema = z.object({
  value: z.number(),
  name: z.string()
});
export type IUserAttributeSchema = z.infer<typeof UserAttributeSchema>;

export const UserProfileItemSchema = z.object({
  name: z.string(),
  status: z.string().optional(),
  required: z.boolean(),
  path: z.string().optional(),
  feedback: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IUserProfileItemSchema = z.infer<typeof UserProfileItemSchema>;

export const UserGeneraldocsThreadSchema = z.object({
  isFinalVersion: z.boolean().optional(),
  latest_message_left_by_id: z.string().optional(),
  doc_thread_id: z.string().optional(),
  updatedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date().optional()
});
export type IUserGeneraldocsThreadSchema = z.infer<typeof UserGeneraldocsThreadSchema>;

// =========== Course Schemas ===========

export const CourseAnalysisSchema = z.object({
  path: z.string().optional(),
  analyzed_course: z.array(z.string()).optional(),
  isAnalysed: z.boolean().optional(),
  isAnalysedV2: z.boolean().optional(),
  pathV2: z.string().optional(),
  updatedAtV2: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
});
export type ICourseAnalysisSchema = z.infer<typeof CourseAnalysisSchema>;

export const CourseSchema = z.object({
  student_id: z.string().optional(),
  name: z.string().optional(),
  table_data_string: z.string().optional(),
  table_data_string_locked: z.boolean().optional(),
  table_data_string_taiger_guided: z.string().optional(),
  updatedAt: z.coerce.date().optional(),
  analysis: CourseAnalysisSchema.optional()
});
export type ICourseSchema = z.infer<typeof CourseSchema>;

// =========== Application Sub-schemas ===========

export const ApplicationUniAssistSchema = z.object({
  status: z.string().optional(),
  vpd_file_path: z.string().optional(),
  vpd_paid_confirmation_file_path: z.string().optional(),
  vpd_paid_confirmation_file_status: z.string().optional(),
  isPaid: z.boolean().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IApplicationUniAssistSchema = z.infer<typeof ApplicationUniAssistSchema>;

export const ApplicationPortalCredentialsSchema = z.object({
  application_portal_a: z
    .object({ account: z.string().optional(), password: z.string().optional() })
    .optional(),
  application_portal_b: z
    .object({ account: z.string().optional(), password: z.string().optional() })
    .optional()
});
export type IApplicationPortalCredentialsSchema = z.infer<typeof ApplicationPortalCredentialsSchema>;

export const ApplicationDocModificationThreadItemSchema = z.object({
  isFinalVersion: z.boolean().optional(),
  latest_message_left_by_id: z.string().optional(),
  doc_thread_id: z.string().optional(),
  updatedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date().optional()
});
export type IApplicationDocModificationThreadItemSchema = z.infer<typeof ApplicationDocModificationThreadItemSchema>;

export const ApplicationAdmissionLetterSchema = z.object({
  status: z.string().optional(),
  admission_file_path: z.string().optional(),
  comments: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IApplicationAdmissionLetterSchema = z.infer<typeof ApplicationAdmissionLetterSchema>;

// =========== Program Schema ===========

export const ProgramSchema = z.object({
  isArchiv: z.boolean().optional(),
  isLocked: z.boolean().optional(),
  school: z.string(),
  program_name: z.string(),
  programSubjects: z.array(z.string()).optional(),
  degree: z.string().optional(),
  semester: z.string().optional(),
  lang: z.string().optional(),
  gpa_requirement: z.string().optional(),
  allowOnlyGraduatedApplicant: z.boolean().optional(),
  application_start: z.string().optional(),
  application_deadline: z.string().optional(),
  uni_assist: z.string().optional(),
  englishTestHandLater: z.boolean().optional(),
  toefl: z.string().optional(),
  toefl_reading: z.number().optional(),
  toefl_listening: z.number().optional(),
  toefl_writing: z.number().optional(),
  toefl_speaking: z.number().optional(),
  ielts: z.string().optional(),
  ielts_reading: z.number().optional(),
  ielts_listening: z.number().optional(),
  ielts_writing: z.number().optional(),
  ielts_speaking: z.number().optional(),
  germanTestHandLater: z.boolean().optional(),
  goetheZertifikat: z.string().optional(),
  testdaf: z.string().optional(),
  dsh: z.string().optional(),
  gre: z.string().optional(),
  gre_verbal: z.number().optional(),
  gre_quantitative: z.number().optional(),
  gre_analytical_writing: z.number().optional(),
  gmat: z.string().optional(),
  ml_required: z.string().optional(),
  ml_requirements: z.string().optional(),
  sop_required: z.string().optional(),
  sop_requirements: z.string().optional(),
  phs_required: z.string().optional(),
  phs_requirements: z.string().optional(),
  rl_required: z.string().optional(),
  rl_requirements: z.string().optional(),
  is_rl_specific: z.boolean().optional(),
  essay_required: z.string().optional(),
  essay_requirements: z.string().optional(),
  essay_difficulty: z.string().optional(),
  portfolio_required: z.string().optional(),
  portfolio_requirements: z.string().optional(),
  supplementary_form_required: z.string().optional(),
  supplementary_form_requirements: z.string().optional(),
  curriculum_analysis_required: z.string().optional(),
  curriculum_analysis_requirements: z.string().optional(),
  scholarship_form_required: z.string().optional(),
  scholarship_form_requirements: z.string().optional(),
  module_description_required: z.string().optional(),
  ects_requirements: z.string().optional(),
  special_notes: z.string().optional(),
  comments: z.string().optional(),
  application_portal_a: z.string().optional(),
  application_portal_b: z.string().optional(),
  application_portal_a_instructions: z.string().optional(),
  application_portal_b_instructions: z.string().optional(),
  uni_assist_link: z.string().optional(),
  website: z.string().optional(),
  fpso: z.string().optional(),
  updatedAt: z.coerce.date().optional(),
  whoupdated: z.string().optional(),
  tuition_fees: z.string().optional(),
  contact: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  isPrivateSchool: z.boolean().optional(),
  isPartnerSchool: z.boolean().optional(),
  schoolType: z.string().optional(),
  tags: z.array(z.string()).optional(),
  url: z.string().optional(),
  isNC: z.boolean().optional(),
  zipCode: z.string().optional()
});
export type IProgramSchema = z.infer<typeof ProgramSchema>;

// =========== Documentation Schemas ===========

export const DocumentationSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  prop: z.string().optional(),
  text: z.string().optional(),
  country: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IDocumentationSchema = z.infer<typeof DocumentationSchema>;

export const DocspageSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  prop: z.string().optional(),
  author: z.string().optional(),
  text: z.string().optional(),
  country: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IDocspageSchema = z.infer<typeof DocspageSchema>;

export const InternaldocSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  internal: z.boolean().optional(),
  author: z.string().optional(),
  text: z.string().optional(),
  country: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IInternaldocSchema = z.infer<typeof InternaldocSchema>;

// =========== Keywordset Schema ===========

export const KeywordsetKeywordsSchema = z.object({
  zh: z.array(z.string()).optional(),
  en: z.array(z.string()).optional()
});
export type IKeywordsetKeywordsSchema = z.infer<typeof KeywordsetKeywordsSchema>;

export const KeywordsetSchema = z.object({
  categoryName: z.string().optional(),
  description: z.string().optional(),
  keywords: KeywordsetKeywordsSchema.optional(),
  antiKeywords: KeywordsetKeywordsSchema.optional()
});
export type IKeywordsetSchema = z.infer<typeof KeywordsetSchema>;

// =========== SurveyInput Schema ===========

export const SurveyInputSurveyContentSchema = z.object({
  questionId: z.string().optional(),
  question: z.string().optional(),
  answer: z.string().optional(),
  type: z.enum(['word', 'sentence', 'paragraph', 'essay']).optional(),
  contentType: z.string().optional()
});
export type ISurveyInputSurveyContentSchema = z.infer<typeof SurveyInputSurveyContentSchema>;

export const SurveyInputSchema = z.object({
  studentId: z.string(),
  programId: z.string().optional(),
  fileType: z.string(),
  isFinalVersion: z.boolean().optional(),
  surveyContent: z.array(SurveyInputSurveyContentSchema).optional(),
  surveyStatus: z.enum(['empty', 'provided', 'generated', 'blocked']).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
});
export type ISurveyInputSchema = z.infer<typeof SurveyInputSchema>;

// =========== Template Schema ===========

export const TemplateSchema = z.object({
  name: z.string(),
  category_name: z.string(),
  path: z.string(),
  updatedAt: z.coerce.date().optional()
});
export type ITemplateSchema = z.infer<typeof TemplateSchema>;

// =========== Basedocumentationslink Schema ===========

export const BasedocumentationslinkSchema = z.object({
  key: z.string().optional(),
  category: z.string().optional(),
  link: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IBasedocumentationslinkSchema = z.infer<typeof BasedocumentationslinkSchema>;

// =========== AllCourse Schema ===========

export const AllCourseSchema = z.object({
  updatedBy: z.string(),
  all_course_chinese: z.string(),
  all_course_english: z.string(),
  description: z.string()
});
export type IAllCourseSchema = z.infer<typeof AllCourseSchema>;

// =========== Permission Schema ===========

export const PermissionSchema = z.object({
  user_id: z.string().optional(),
  taigerAiQuota: z.number().optional(),
  canAssignEditors: z.boolean().optional(),
  canUseTaiGerAI: z.boolean().optional(),
  canModifyProgramList: z.boolean().optional(),
  canModifyAllBaseDocuments: z.boolean().optional(),
  canAccessAllChat: z.boolean().optional(),
  canAssignAgents: z.boolean().optional(),
  canModifyDocumentation: z.boolean().optional(),
  canAccessStudentDatabase: z.boolean().optional(),
  canAddUser: z.boolean().optional(),
  canModifyUser: z.boolean().optional(),
  isEssayWriters: z.boolean().optional(),
  updatedAt: z.coerce.date().optional()
});
export type IPermissionSchema = z.infer<typeof PermissionSchema>;

// =========== Note Schema ===========

export const NoteSchema = z.object({
  student_id: z.string().optional(),
  notes: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});
export type INoteSchema = z.infer<typeof NoteSchema>;

// =========== InterviewSurveyResponse Schema ===========

export const InterviewSurveyResponseResponseSchema = z.object({
  questionId: z.string().optional(),
  answer: z.number().optional()
});
export type IInterviewSurveyResponseResponseSchema = z.infer<typeof InterviewSurveyResponseResponseSchema>;

export const InterviewSurveyResponseSchema = z.object({
  student_id: z.string().optional(),
  interview_id: z.string().optional(),
  program_id: z.string().optional(),
  responses: z.array(InterviewSurveyResponseResponseSchema).optional(),
  isFinal: z.boolean().optional(),
  interviewQuestions: z.string().optional(),
  interviewFeedback: z.string().optional()
});
export type IInterviewSurveyResponseSchema = z.infer<typeof InterviewSurveyResponseSchema>;

// =========== Ticket Schema ===========

export const TicketSchema = z.object({
  requester_id: z.string(),
  resolver_id: z.string().optional(),
  program_id: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  description: z.string().optional(),
  feedback: z.string().optional(),
  createdAt: z.coerce.date().optional()
});
export type ITicketSchema = z.infer<typeof TicketSchema>;

// =========== Complaint Schema ===========

export const ComplaintMessageFileSchema = z.object({
  name: z.string(),
  path: z.string()
});
export type IComplaintMessageFileSchema = z.infer<typeof ComplaintMessageFileSchema>;

export const ComplaintMessageSchema = z.object({
  user_id: z.string().optional(),
  message: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  file: z.array(ComplaintMessageFileSchema).optional(),
  ignore_message: z.boolean().optional()
});
export type IComplaintMessageSchema = z.infer<typeof ComplaintMessageSchema>;

export const ComplaintSchema = z.object({
  requester_id: z.string(),
  status: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  messages: z.array(ComplaintMessageSchema).optional(),
  createdAt: z.coerce.date().optional()
});
export type IComplaintSchema = z.infer<typeof ComplaintSchema>;

// =========== Event Schema ===========
// Named EventBaseSchema to avoid conflict with Mongoose EventSchema from src/model/Event.ts

export const EventBaseSchema = z.object({
  requester_id: z.array(z.string()).optional(),
  receiver_id: z.array(z.string()).optional(),
  isConfirmedRequester: z.boolean().optional(),
  isConfirmedReceiver: z.boolean().optional(),
  meetingLink: z.string().optional(),
  event_type: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  start: z.coerce.date().optional(),
  end: z.coerce.date().optional()
});
export type IEventSchema = z.infer<typeof EventBaseSchema>;

// =========== Interview Schema ===========

export const InterviewSchema = z.object({
  student_id: z.string().optional(),
  trainer_id: z.array(z.string()).optional(),
  thread_id: z.string().optional(),
  program_id: z.string().optional(),
  event_id: z.string().optional(),
  interview_description: z.string().optional(),
  interviewer: z.string().optional(),
  interview_duration: z.string().optional(),
  interview_date: z.coerce.date().optional(),
  isClosed: z.boolean().optional(),
  start: z.coerce.date().optional(),
  end: z.coerce.date().optional()
});
export type IInterviewSchema = z.infer<typeof InterviewSchema>;

// =========== Communication Schema ===========

export const CommunicationFileSchema = z.object({
  name: z.string(),
  path: z.string()
});
export type ICommunicationFileSchema = z.infer<typeof CommunicationFileSchema>;

export const CommunicationSchema = z.object({
  student_id: z.string().optional(),
  user_id: z.string().optional(),
  message: z.string().optional(),
  readBy: z.array(z.string()).optional(),
  timeStampReadBy: z.unknown().optional(),
  files: z.array(CommunicationFileSchema).optional(),
  createdAt: z.coerce.date().optional(),
  ignore_message: z.boolean().optional(),
  ignoredMessageUpdatedAt: z.coerce.date().optional(),
  ignoredMessageBy: z.string().optional()
});
export type ICommunicationSchema = z.infer<typeof CommunicationSchema>;

// =========== DocumentThread Schema ===========

export const DocumentthreadMessageFileSchema = z.object({
  name: z.string(),
  path: z.string()
});
export type IDocumentthreadMessageFileSchema = z.infer<typeof DocumentthreadMessageFileSchema>;

export const DocumentthreadMessageSchema = z.object({
  user_id: z.string().optional(),
  message: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  file: z.array(DocumentthreadMessageFileSchema).optional(),
  ignore_message: z.boolean().optional()
});
export type IDocumentthreadMessageSchema = z.infer<typeof DocumentthreadMessageSchema>;

export const DocumentthreadSchema = z.object({
  student_id: z.string(),
  program_id: z.string().optional(),
  application_id: z.string().optional(),
  outsourced_user_id: z.array(z.string()).optional(),
  pin_by_user_id: z.array(z.string()).optional(),
  flag_by_user_id: z.array(z.string()).optional(),
  file_type: z.string(),
  isFinalVersion: z.boolean().optional(),
  isOriginAuthorDeclarationConfirmedByStudent: z.boolean().optional(),
  isOriginAuthorDeclarationConfirmedByStudentTimestamp: z.coerce.date().optional(),
  messages: z.array(DocumentthreadMessageSchema).optional(),
  essayReviewerIds: z.array(z.string()).optional(),
  updatedAt: z.coerce.date().optional()
});
export type IDocumentthreadSchema = z.infer<typeof DocumentthreadSchema>;

// =========== Audit Schema ===========

export const AuditSchema = z.object({
  performedBy: z.string().optional(),
  targetUserId: z.string().optional(),
  targetDocumentThreadId: z.string().optional(),
  interviewThreadId: z.string().optional(),
  action: z.string().optional(),
  field: z.string().optional(),
  changes: z
    .object({
      before: z.unknown().optional(),
      after: z.unknown().optional()
    })
    .optional()
});
export type IAuditSchema = z.infer<typeof AuditSchema>;

// =========== ProgramRequirement Schema ===========

export const ProgramrequirementProgramCategorySchema = z.object({
  program_category: z.string().optional(),
  category_description: z.string().optional(),
  requiredECTS: z.number().optional(),
  keywordSets: z.array(z.string()).optional(),
  maxScore: z.number().optional()
});
export type IProgramrequirementProgramCategorySchema = z.infer<typeof ProgramrequirementProgramCategorySchema>;

export const ProgramrequirementSchema = z.object({
  programId: z.array(z.string()).optional(),
  program_categories: z.array(ProgramrequirementProgramCategorySchema).optional(),
  attributes: z.array(z.string()).optional(),
  fpso: z.string().optional(),
  admissionDescription: z.string().optional(),
  gpaScoreBoundaryGPA: z.number().optional(),
  gpaScore: z.number().optional(),
  gpaMinScore: z.number().optional(),
  coursesScore: z.number().optional(),
  cvScore: z.number().optional(),
  mlScore: z.number().optional(),
  rlScore: z.number().optional(),
  essayScore: z.number().optional(),
  gmatScore: z.number().optional(),
  greScore: z.number().optional(),
  interviewScore: z.number().optional(),
  workExperienceScore: z.number().optional(),
  testScore: z.number().optional(),
  firstRoundConsidered: z.array(z.string()).optional(),
  secondRoundConsidered: z.array(z.string()).optional(),
  directRejectionScore: z.number().optional(),
  directAdmissionScore: z.number().optional(),
  directRejectionSecondScore: z.number().optional(),
  directAdmissionSecondScore: z.number().optional()
});
export type IProgramrequirementSchema = z.infer<typeof ProgramrequirementSchema>;
