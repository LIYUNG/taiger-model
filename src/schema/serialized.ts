/**
 * Zod schemas for API-serialized model types (all ObjectId refs as strings).
 * Types are inferred from schemas via z.infer<>.
 * Circular references (IStudentResponse <-> IApplicationPopulated) are handled with z.lazy().
 */
import { z } from 'zod';

import {
  UserNotificationSchema,
  UserTaigeraiSchema,
  UserApplicationPreferenceSchema,
  UserAcademicBackgroundSchema,
  UserAttributeSchema,
  UserProfileItemSchema,
  UserGeneraldocsThreadSchema,
  CourseSchema,
  ApplicationUniAssistSchema,
  ApplicationPortalCredentialsSchema,
  ApplicationDocModificationThreadItemSchema,
  ApplicationAdmissionLetterSchema,
  ProgramSchema,
  DocumentthreadMessageSchema,
  CommunicationSchema,
  InterviewSchema,
  InterviewSurveyResponseSchema,
  TicketSchema,
  ComplaintSchema,
  AuditSchema,
  EventBaseSchema,
  PermissionSchema,
  NoteSchema,
  DocumentationSchema,
  DocspageSchema,
  InternaldocSchema,
  AllCourseSchema,
  KeywordsetSchema,
  SurveyInputSchema,
  TemplateSchema,
  BasedocumentationslinkSchema,
  ProgramrequirementSchema
} from './models';

// =========== Program with _id ===========

export const ProgramWithIdSchema = ProgramSchema.extend({
  _id: z.string(),
  vcId: z.string().optional()
});
export type IProgramWithId = z.infer<typeof ProgramWithIdSchema>;

// =========== Agent/Editor with _id ===========

const officehoursDaySchema = z.object({
  active: z.boolean().optional(),
  time_slots: z.array(z.unknown()).optional()
});

const agentNotificationSchema = z.object({
  isRead_new_base_docs_uploaded: z
    .array(
      z.object({
        student_id: z.string().optional(),
        student_firstname: z.string().optional(),
        student_lastname: z.string().optional()
      })
    )
    .optional(),
  isRead_new_survey_updated: z.boolean().optional(),
  isRead_applications_status_changed: z.boolean().optional(),
  isRead_new_programs_assigned: z.boolean().optional()
});

const editorAttributeSchema = z.object({
  can_write_ml: z.boolean().optional(),
  can_write_rl: z.boolean().optional(),
  can_write_cv: z.boolean().optional(),
  can_write_essay: z.boolean().optional(),
  can_do_interview: z.boolean().optional()
});

const editorNotificationSchema = z.object({
  isRead_survey_not_complete: z.boolean().optional(),
  isRead_base_documents_missing: z.boolean().optional(),
  isRead_base_documents_rejected: z.boolean().optional(),
  isRead_new_programs_assigned: z.boolean().optional()
});

/** Shared base user fields (API-safe, no Mongoose types) */
const userBaseFields = {
  _id: z.string(),
  role: z.string().optional(),
  firstname: z.string().optional(),
  firstname_chinese: z.string().optional(),
  lastname: z.string().optional(),
  lastname_chinese: z.string().optional(),
  email: z.string().optional(),
  pictureUrl: z.string().optional(),
  archiv: z.boolean().optional(),
  birthday: z.string().optional(),
  linkedIn: z.string().optional(),
  lineId: z.string().optional(),
  timezone: z.string().optional(),
  isAccountActivated: z.boolean().optional(),
  notification: UserNotificationSchema.optional(),
  taigerai: UserTaigeraiSchema.optional(),
  application_preference: UserApplicationPreferenceSchema.optional(),
  academic_background: UserAcademicBackgroundSchema.optional(),
  lastLoginAt: z.coerce.date().optional(),
  needEditor: z.boolean().optional(),
  applying_program_count: z.number().optional(),
  attributes: z.array(UserAttributeSchema).optional(),
  profile: z.array(UserProfileItemSchema).optional(),
  courses: CourseSchema.optional()
};

export const AgentWithIdSchema = z.object({
  ...userBaseFields,
  officehours: z.record(officehoursDaySchema).optional(),
  selfIntroduction: z.string().optional(),
  agent_notification: agentNotificationSchema.optional()
});
export type IAgentWithId = z.infer<typeof AgentWithIdSchema>;

export const EditorWithIdSchema = z.object({
  ...userBaseFields,
  officehours: z.record(officehoursDaySchema).optional(),
  editor_notification: editorNotificationSchema.optional(),
  attribute: editorAttributeSchema.optional()
});
export type IEditorWithId = z.infer<typeof EditorWithIdSchema>;

// =========== Circular reference: IStudentResponse <-> IApplicationPopulated ===========
// Declare TypeScript interfaces first to break the circular dependency, then
// annotate the Zod schemas with z.ZodType<T> so z.lazy() resolves correctly.

export interface IStudentResponseDef {
  _id: string;
  role?: string;
  firstname?: string;
  firstname_chinese?: string;
  lastname?: string;
  lastname_chinese?: string;
  email?: string;
  pictureUrl?: string;
  archiv?: boolean;
  birthday?: string;
  linkedIn?: string;
  lineId?: string;
  timezone?: string;
  isAccountActivated?: boolean;
  notification?: z.infer<typeof UserNotificationSchema>;
  taigerai?: z.infer<typeof UserTaigeraiSchema>;
  application_preference?: z.infer<typeof UserApplicationPreferenceSchema>;
  academic_background?: z.infer<typeof UserAcademicBackgroundSchema>;
  lastLoginAt?: Date;
  needEditor?: boolean;
  applying_program_count?: number;
  attributes?: z.infer<typeof UserAttributeSchema>[];
  profile?: z.infer<typeof UserProfileItemSchema>[];
  generaldocs_threads?: z.infer<typeof UserGeneraldocsThreadSchema>[];
  courses?: z.infer<typeof CourseSchema>;
  applications?: IApplicationPopulatedDef[];
  agents?: IAgentWithId[];
  editors?: IEditorWithId[];
}

export interface IApplicationPopulatedDef {
  _id: string;
  programId?: IProgramWithId;
  studentId?: IStudentResponseDef;
  uni_assist?: z.infer<typeof ApplicationUniAssistSchema>;
  portal_credentials?: z.infer<typeof ApplicationPortalCredentialsSchema>;
  doc_modification_thread?: z.infer<typeof ApplicationDocModificationThreadItemSchema>[];
  reject_reason?: string;
  admission_letter?: z.infer<typeof ApplicationAdmissionLetterSchema>;
  finalEnrolment?: boolean;
  decided?: string;
  closed?: string;
  admission?: string;
  application_year?: string;
  isLocked?: boolean;
  credential_a_filled?: boolean;
  credential_b_filled?: boolean;
}

/** Application response with string _id and unpopulated refs */
export const ApplicationWithIdSchema = z.object({
  _id: z.string(),
  programId: z.string().optional(),
  studentId: z.string().optional(),
  uni_assist: ApplicationUniAssistSchema.optional(),
  portal_credentials: ApplicationPortalCredentialsSchema.optional(),
  doc_modification_thread: z.array(ApplicationDocModificationThreadItemSchema).optional(),
  reject_reason: z.string().optional(),
  admission_letter: ApplicationAdmissionLetterSchema.optional(),
  finalEnrolment: z.boolean().optional(),
  decided: z.string().optional(),
  closed: z.string().optional(),
  admission: z.string().optional(),
  application_year: z.string().optional(),
  isLocked: z.boolean().optional(),
  credential_a_filled: z.boolean().optional(),
  credential_b_filled: z.boolean().optional()
});
export type IApplicationWithId = z.infer<typeof ApplicationWithIdSchema>;

/** Application with populated programId and studentId — uses z.lazy for circular ref */
export const ApplicationPopulatedSchema: z.ZodType<IApplicationPopulatedDef> = z.lazy(() =>
  z.object({
    _id: z.string(),
    programId: ProgramWithIdSchema.optional(),
    studentId: StudentResponseSchema.optional(),
    uni_assist: ApplicationUniAssistSchema.optional(),
    portal_credentials: ApplicationPortalCredentialsSchema.optional(),
    doc_modification_thread: z.array(ApplicationDocModificationThreadItemSchema).optional(),
    reject_reason: z.string().optional(),
    admission_letter: ApplicationAdmissionLetterSchema.optional(),
    finalEnrolment: z.boolean().optional(),
    decided: z.string().optional(),
    closed: z.string().optional(),
    admission: z.string().optional(),
    application_year: z.string().optional(),
    isLocked: z.boolean().optional(),
    credential_a_filled: z.boolean().optional(),
    credential_b_filled: z.boolean().optional()
  })
);
export type IApplicationPopulated = IApplicationPopulatedDef;

/** Student response with populated agents, editors, applications — uses z.lazy for circular ref */
export const StudentResponseSchema: z.ZodType<IStudentResponseDef> = z.lazy(() =>
  z.object({
    ...userBaseFields,
    generaldocs_threads: z.array(UserGeneraldocsThreadSchema).optional(),
    applications: z.array(ApplicationPopulatedSchema).optional(),
    agents: z.array(AgentWithIdSchema).optional(),
    editors: z.array(EditorWithIdSchema).optional()
  })
);
export type IStudentResponse = IStudentResponseDef;

/** Frontend-friendly User/Student with string _id (no nested ObjectId refs) */
export const UserWithIdSchema = z.object({
  ...userBaseFields,
  generaldocs_threads: z.array(UserGeneraldocsThreadSchema).optional()
});
export type IUserWithId = z.infer<typeof UserWithIdSchema>;

// =========== Document thread with _id ===========

export const DocumentthreadWithIdSchema = z.object({
  _id: z.string(),
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
export type IDocumentthreadWithId = z.infer<typeof DocumentthreadWithIdSchema>;

/** Document thread with populated refs — student_id can be object or string */
export const DocumentthreadPopulatedSchema = z.object({
  _id: z.string(),
  student_id: z.union([StudentResponseSchema, z.string()]),
  program_id: z.union([ProgramWithIdSchema, z.string()]).optional(),
  application_id: z.union([ApplicationPopulatedSchema, z.string()]).optional(),
  outsourced_user_id: z.array(UserWithIdSchema).optional(),
  pin_by_user_id: z.array(UserWithIdSchema).optional(),
  flag_by_user_id: z.array(UserWithIdSchema).optional(),
  essayReviewerIds: z.array(UserWithIdSchema).optional(),
  file_type: z.string(),
  isFinalVersion: z.boolean().optional(),
  isOriginAuthorDeclarationConfirmedByStudent: z.boolean().optional(),
  isOriginAuthorDeclarationConfirmedByStudentTimestamp: z.coerce.date().optional(),
  messages: z.array(DocumentthreadMessageSchema).optional(),
  updatedAt: z.coerce.date().optional()
});
export type IDocumentthreadPopulated = z.infer<typeof DocumentthreadPopulatedSchema>;

// =========== Simple WithId types ===========

export const CommunicationWithIdSchema = CommunicationSchema.extend({ _id: z.string() });
export type ICommunicationWithId = z.infer<typeof CommunicationWithIdSchema>;

export const InterviewWithIdSchema = InterviewSchema.extend({ _id: z.string() });
export type IInterviewWithId = z.infer<typeof InterviewWithIdSchema>;

export const InterviewSurveyResponseWithIdSchema = InterviewSurveyResponseSchema.extend({
  _id: z.string()
});
export type IInterviewSurveyResponseWithId = z.infer<typeof InterviewSurveyResponseWithIdSchema>;

export const TicketWithIdSchema = TicketSchema.extend({
  _id: z.string(),
  createdAt: z.coerce.date().optional()
});
export type ITicketWithId = z.infer<typeof TicketWithIdSchema>;

export const ComplaintWithIdSchema = ComplaintSchema.extend({
  _id: z.string(),
  createdAt: z.coerce.date().optional()
});
export type IComplaintWithId = z.infer<typeof ComplaintWithIdSchema>;

export const AuditWithIdSchema = AuditSchema.extend({
  _id: z.string(),
  createdAt: z.coerce.date().optional()
});
export type IAuditWithId = z.infer<typeof AuditWithIdSchema>;

export const EventWithIdSchema = EventBaseSchema.extend({
  _id: z.string(),
  createdAt: z.coerce.date().optional()
});
export type IEventWithId = z.infer<typeof EventWithIdSchema>;

export const NoteWithIdSchema = NoteSchema.extend({ _id: z.string() });
export type INoteWithId = z.infer<typeof NoteWithIdSchema>;

export const PermissionWithIdSchema = PermissionSchema.extend({ _id: z.string() });
export type IPermissionWithId = z.infer<typeof PermissionWithIdSchema>;

export const DocumentationWithIdSchema = DocumentationSchema.extend({ _id: z.string() });
export type IDocumentationWithId = z.infer<typeof DocumentationWithIdSchema>;

export const DocspageWithIdSchema = DocspageSchema.extend({ _id: z.string() });
export type IDocspageWithId = z.infer<typeof DocspageWithIdSchema>;

export const InternaldocWithIdSchema = InternaldocSchema.extend({ _id: z.string() });
export type IInternaldocWithId = z.infer<typeof InternaldocWithIdSchema>;

export const ProgramrequirementWithIdSchema = ProgramrequirementSchema.extend({
  _id: z.string()
});
export type IProgramrequirementWithId = z.infer<typeof ProgramrequirementWithIdSchema>;

export const AllCourseWithIdSchema = AllCourseSchema.extend({ _id: z.string() });
export type IAllCourseWithId = z.infer<typeof AllCourseWithIdSchema>;

export const KeywordsetWithIdSchema = KeywordsetSchema.extend({ _id: z.string() });
export type IKeywordsetWithId = z.infer<typeof KeywordsetWithIdSchema>;

export const SurveyInputWithIdSchema = SurveyInputSchema.extend({ _id: z.string() });
export type ISurveyInputWithId = z.infer<typeof SurveyInputWithIdSchema>;

export const TemplateWithIdSchema = TemplateSchema.extend({ _id: z.string() });
export type ITemplateWithId = z.infer<typeof TemplateWithIdSchema>;

export const BasedocumentationslinkWithIdSchema = BasedocumentationslinkSchema.extend({
  _id: z.string()
});
export type IBasedocumentationslinkWithId = z.infer<typeof BasedocumentationslinkWithIdSchema>;
