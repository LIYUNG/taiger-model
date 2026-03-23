import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import {
  DocumentthreadWithIdSchema,
  DocumentthreadPopulatedSchema,
  SurveyInputWithIdSchema,
  UserWithIdSchema,
  AgentWithIdSchema,
  EditorWithIdSchema,
  AuditWithIdSchema
} from './serialized';

// =========== Schemas ===========

export const ThreadFavoriteDataSchema = z.object({
  isFlagged: z.boolean()
});

export const GetMessagesThreadResponseSchema = z.object({
  success: z.boolean(),
  data: DocumentthreadPopulatedSchema.optional(),
  similarThreads: z.array(DocumentthreadPopulatedSchema).optional(),
  agents: z.array(AgentWithIdSchema).optional(),
  editors: z.array(EditorWithIdSchema).optional(),
  threadAuditLog: z.array(AuditWithIdSchema).optional(),
  deadline: z.unknown().optional(),
  conflict_list: z.array(z.unknown()).optional()
});

export const GetActiveThreadsResponseSchema = createApiResponseSchema(
  z.array(DocumentthreadPopulatedSchema)
);

export const GetThreadsByStudentResponseSchema = createApiResponseSchema(
  z.array(DocumentthreadPopulatedSchema)
);

export const GetMyStudentThreadsResponseSchema = createApiResponseSchema(
  z.object({
    threads: z.array(DocumentthreadPopulatedSchema),
    user: UserWithIdSchema
  })
);

export const GetMyStudentThreadMetricsResponseSchema = createApiResponseSchema(z.unknown());

export const PutThreadFavoriteResponseSchema = createApiResponseSchema(ThreadFavoriteDataSchema);

export const SetFileFinalResponseSchema = createApiResponseSchema(DocumentthreadWithIdSchema);

export const InitGeneralThreadResponseSchema = createApiResponseSchema(DocumentthreadWithIdSchema);

export const InitApplicationThreadResponseSchema = createApiResponseSchema(
  DocumentthreadWithIdSchema
);

export const SubmitMessageResponseSchema = createApiResponseSchema(DocumentthreadWithIdSchema);

export const DeleteGeneralFileThreadResponseSchema = SuccessResponseSchema;

export const DeleteProgramSpecificFileThreadResponseSchema = SuccessResponseSchema;

export const DeleteMessageInThreadResponseSchema = SuccessResponseSchema;

export const UpdateEssayWriterResponseSchema = createApiResponseSchema(DocumentthreadWithIdSchema);

export const UploadDocumentThreadImageResponseSchema = createApiResponseSchema(
  DocumentthreadWithIdSchema
);

export const PutOriginAuthorConfirmedResponseSchema = createApiResponseSchema(
  DocumentthreadWithIdSchema
);

export const IgnoreMessageThreadResponseSchema = createApiResponseSchema(DocumentthreadWithIdSchema);

export const GetCheckDocumentPatternResponseSchema = createApiResponseSchema(z.unknown());

export const GetSurveyInputsResponseSchema = createApiResponseSchema(SurveyInputWithIdSchema);

export const PostSurveyInputResponseSchema = createApiResponseSchema(SurveyInputWithIdSchema);

export const PutSurveyInputResponseSchema = createApiResponseSchema(SurveyInputWithIdSchema);

export const DeleteSurveyInputResponseSchema = SuccessResponseSchema;

// =========== Inferred types ===========

/** Favorite toggle result */
export type ThreadFavoriteData = z.infer<typeof ThreadFavoriteDataSchema>;

/**
 * GET /api/document-threads/:documentsthreadId
 * Non-standard: returns multiple top-level fields
 */
export type GetMessagesThreadResponse = z.infer<typeof GetMessagesThreadResponseSchema>;

/** GET /api/document-threads/overview/all */
export type GetActiveThreadsResponse = z.infer<typeof GetActiveThreadsResponseSchema>;

/** GET /api/document-threads/student-threads/:studentId */
export type GetThreadsByStudentResponse = z.infer<typeof GetThreadsByStudentResponseSchema>;

/**
 * GET /api/document-threads/overview/taiger-user/:userId
 * Non-standard: data is an object with threads + user
 */
export type GetMyStudentThreadsResponse = z.infer<typeof GetMyStudentThreadsResponseSchema>;

/** GET /api/document-threads/overview/my-student-metrics */
export type GetMyStudentThreadMetricsResponse = z.infer<
  typeof GetMyStudentThreadMetricsResponseSchema
>;

/** PUT /api/document-threads/:documentsthreadId/favorite */
export type PutThreadFavoriteResponse = z.infer<typeof PutThreadFavoriteResponseSchema>;

/** PUT /api/document-threads/:documentsthreadId/:studentId (set as final) */
export type SetFileFinalResponse = z.infer<typeof SetFileFinalResponseSchema>;

/** POST /api/document-threads/init/general/:studentId/:document_catgory */
export type InitGeneralThreadResponse = z.infer<typeof InitGeneralThreadResponseSchema>;

/** POST /api/document-threads/init/application/:studentId/:applicationId/:document_catgory */
export type InitApplicationThreadResponse = z.infer<typeof InitApplicationThreadResponseSchema>;

/** POST /api/document-threads/:documentsthreadId/:studentId (submit message) */
export type SubmitMessageResponse = z.infer<typeof SubmitMessageResponseSchema>;

/** DELETE /api/document-threads/:documentsthreadId/:studentId */
export type DeleteGeneralFileThreadResponse = z.infer<typeof DeleteGeneralFileThreadResponseSchema>;

/** DELETE /api/document-threads/:documentsthreadId/:application_id/:studentId */
export type DeleteProgramSpecificFileThreadResponse = z.infer<
  typeof DeleteProgramSpecificFileThreadResponseSchema
>;

/** DELETE /api/document-threads/delete/:documentsthreadId/:messageId */
export type DeleteMessageInThreadResponse = z.infer<typeof DeleteMessageInThreadResponseSchema>;

/** POST /api/document-threads/:documentsthreadId/essay */
export type UpdateEssayWriterResponse = z.infer<typeof UpdateEssayWriterResponseSchema>;

/** POST /api/document-threads/image/:documentsthreadId/:studentId */
export type UploadDocumentThreadImageResponse = z.infer<
  typeof UploadDocumentThreadImageResponseSchema
>;

/** PUT /api/document-threads/:documentsthreadId/:studentId/origin-author */
export type PutOriginAuthorConfirmedResponse = z.infer<typeof PutOriginAuthorConfirmedResponseSchema>;

/** PUT /api/document-threads/:documentThreadId/:documentsthreadMessageId/:ignoreMessageState/ignored */
export type IgnoreMessageThreadResponse = z.infer<typeof IgnoreMessageThreadResponseSchema>;

/** GET /api/document-threads/pattern/check/:thread_id/:file_type */
export type GetCheckDocumentPatternResponse = z.infer<typeof GetCheckDocumentPatternResponseSchema>;

/** GET /api/document-threads/:documentsthreadId/survey-inputs */
export type GetSurveyInputsResponse = z.infer<typeof GetSurveyInputsResponseSchema>;

/** POST /api/document-threads/survey-input/ */
export type PostSurveyInputResponse = z.infer<typeof PostSurveyInputResponseSchema>;

/** PUT /api/document-threads/survey-input/:surveyId */
export type PutSurveyInputResponse = z.infer<typeof PutSurveyInputResponseSchema>;

/** DELETE /api/document-threads/survey-input/:surveyId */
export type DeleteSurveyInputResponse = z.infer<typeof DeleteSurveyInputResponseSchema>;
