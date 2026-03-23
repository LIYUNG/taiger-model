/**
 * Serialized "API layer" versions of core model interfaces.
 * All ObjectId refs become strings to match JSON API serialization.
 * Types are inferred from Zod schemas via z.infer<>.
 */

// Re-export all serialized schemas and their inferred types from the schema layer
export {
  // Schemas
  ProgramWithIdSchema,
  AgentWithIdSchema,
  EditorWithIdSchema,
  ApplicationWithIdSchema,
  ApplicationPopulatedSchema,
  StudentResponseSchema,
  UserWithIdSchema,
  DocumentthreadWithIdSchema,
  DocumentthreadPopulatedSchema,
  CommunicationWithIdSchema,
  InterviewWithIdSchema,
  InterviewSurveyResponseWithIdSchema,
  TicketWithIdSchema,
  ComplaintWithIdSchema,
  AuditWithIdSchema,
  EventWithIdSchema,
  NoteWithIdSchema,
  PermissionWithIdSchema,
  DocumentationWithIdSchema,
  DocspageWithIdSchema,
  InternaldocWithIdSchema,
  ProgramrequirementWithIdSchema,
  AllCourseWithIdSchema,
  KeywordsetWithIdSchema,
  SurveyInputWithIdSchema,
  TemplateWithIdSchema,
  BasedocumentationslinkWithIdSchema,
  // Inferred types
  IProgramWithId,
  IAgentWithId,
  IEditorWithId,
  IApplicationWithId,
  IApplicationPopulated,
  IStudentResponse,
  IUserWithId,
  IDocumentthreadWithId,
  IDocumentthreadPopulated,
  ICommunicationWithId,
  IInterviewWithId,
  IInterviewSurveyResponseWithId,
  ITicketWithId,
  IComplaintWithId,
  IAuditWithId,
  IEventWithId,
  INoteWithId,
  IPermissionWithId,
  IDocumentationWithId,
  IDocspageWithId,
  IInternaldocWithId,
  IProgramrequirementWithId,
  IAllCourseWithId,
  IKeywordsetWithId,
  ISurveyInputWithId,
  ITemplateWithId,
  IBasedocumentationslinkWithId
} from '../schema/serialized';

// Re-export model sub-schemas for use in API files
// Note: the TypeScript types (IUserAcademicBackgroundUniversity etc.) are already
// exported from src/model/User.ts — only the Zod schemas are exported here.
export {
  UserAcademicBackgroundUniversitySchema,
  UserAcademicBackgroundLanguageSchema,
  UserApplicationPreferenceSchema,
  UserAttributeSchema,
  UserNotificationSchema,
  UserTaigeraiSchema,
  UserProfileItemSchema,
  UserGeneraldocsThreadSchema
} from '../schema/models';
