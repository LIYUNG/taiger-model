import { z } from 'zod';
import {
  SuccessResponseSchema,
  createApiResponseSchema,
  createNullableApiResponseSchema
} from './common';
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
  // Like the thread's own ref fields, these are populated with per-endpoint
  // `select` lists — a two-field agent summary here, not a whole agent.
  similarThreads: z.array(z.unknown()).nullish(),
  agents: z.array(z.unknown()).optional(),
  editors: z.array(z.unknown()).optional(),
  threadAuditLog: z.array(z.unknown()).optional(),
  deadline: z.unknown().optional(),
  conflict_list: z.array(z.unknown()).optional()
});

export const GetActiveThreadsResponseSchema = createApiResponseSchema(
  z.array(DocumentthreadPopulatedSchema)
);

/**
 * `GET /api/document-threads/student-threads/:studentId` wraps the list in a
 * `threads` key; this used to declare the bare array.
 */
export const GetThreadsByStudentResponseSchema = createApiResponseSchema(
  z.object({ threads: z.array(DocumentthreadPopulatedSchema) })
);

export const GetMyStudentThreadsResponseSchema = createApiResponseSchema(
  z.object({
    threads: z.array(DocumentthreadPopulatedSchema),
    user: UserWithIdSchema
  })
);

export const PutThreadFavoriteResponseSchema = createApiResponseSchema(ThreadFavoriteDataSchema);

/**
 * `PUT /api/document-threads/:messagesThreadId/:studentId` answers with just the
 * two fields it changed, not the whole thread this used to declare — the client
 * repaints the row from them.
 */
export const SetFileFinalResponseSchema = createApiResponseSchema(
  z.object({
    isFinalVersion: z.boolean().optional(),
    updatedAt: z.coerce.date().optional()
  })
);

/**
 * The entry pushed onto the student's `generaldocs_threads` /
 * `doc_modification_thread` — a reference to the new thread, not the thread
 * document itself, which is what these used to declare.
 */
export const ThreadRefEntrySchema = z
  .object({
    /**
     * A Mongoose subdocument id, which serialises to this string. The entry is
     * sent straight off the parent document, so it is not narrowed first.
     */
    _id: z.unknown().optional(),
    doc_thread_id: z.unknown().optional(),
    isFinalVersion: z.boolean().optional(),
    latest_message_left_by_id: z.string().nullish(),
    updatedAt: z.coerce.date().optional(),
    createdAt: z.coerce.date().optional()
  });

export const InitGeneralThreadResponseSchema =
  createApiResponseSchema(ThreadRefEntrySchema);

export const InitApplicationThreadResponseSchema =
  createApiResponseSchema(ThreadRefEntrySchema);

export const SubmitMessageResponseSchema = createApiResponseSchema(DocumentthreadWithIdSchema);

export const DeleteGeneralFileThreadResponseSchema = SuccessResponseSchema;

export const DeleteProgramSpecificFileThreadResponseSchema = SuccessResponseSchema;

export const DeleteMessageInThreadResponseSchema = SuccessResponseSchema;

/**
 * The handler re-reads the thread fully populated before sending it, so this is
 * the populated shape — not the id-bearing one it used to declare.
 */
export const UpdateEssayWriterResponseSchema = createApiResponseSchema(
  DocumentthreadPopulatedSchema
);

/** The URL the uploaded image is served from, not the thread. */
export const UploadDocumentThreadImageResponseSchema =
  createApiResponseSchema(z.string());

export const PutOriginAuthorConfirmedResponseSchema = createApiResponseSchema(
  DocumentthreadWithIdSchema
);

/** The driver's update acknowledgement, not the thread. */
export const IgnoreMessageThreadResponseSchema = createApiResponseSchema(
  z.unknown()
);

/**
 * `GET /api/document-threads/pattern/check/...` answers with the verdict at the
 * top level, not under `data`.
 */
export const GetCheckDocumentPatternResponseSchema = createApiResponseSchema(
  z.unknown()
).extend({
  isPassed: z.boolean().optional(),
  /** Why the document failed, when it did. */
  reason: z.unknown().optional(),
  message: z.string().optional()
});

/**
 * `GET /api/document-threads/:messagesThreadId/survey-inputs` answers with the
 * **thread**, with the general and program-specific survey answers attached —
 * not a survey input, which is what this used to declare.
 */
export const GetSurveyInputsResponseSchema = createApiResponseSchema(
  z.object({
    surveyInputs: z.object({
      general: SurveyInputWithIdSchema.optional(),
      /** `false` when the thread has no program, so no specific survey exists. */
      specific: z.union([SurveyInputWithIdSchema, z.literal('')]).optional()
    })
  }).catchall(z.unknown())
);

export const PostSurveyInputResponseSchema = createApiResponseSchema(SurveyInputWithIdSchema);

/** `null` when the id matched nothing — the handler does not 404. */
export const PutSurveyInputResponseSchema = createNullableApiResponseSchema(
  SurveyInputWithIdSchema
);

export const DeleteSurveyInputResponseSchema = SuccessResponseSchema;


// --- Dashboard lists (paginated + per-tab counts) ---

/**
 * One row of the CVMLRL / Essay dashboards.
 *
 * The rows are slim and pre-computed in the aggregation (deadline, document
 * name, message-derived fields, lock status), so this is `catchall` rather than
 * the full thread document.
 */
export const OpenTaskRowSchema = z
  .object({
    id: z.string(),
    student_id: z.unknown().optional(),
    application_id: z.string().nullish(),
    user_id: z.string().nullish(),
    show: z.boolean().optional(),
    isFinalVersion: z.boolean().optional(),
    flag_by_user_id: z.array(z.string()).optional(),
    file_type: z.string().nullish(),
    latest_message_left_by_id: z.string().nullish()
  })
  .catchall(z.unknown());

export const GetActiveThreadsPaginatedResponseSchema = createApiResponseSchema(
  z.object({
    threads: z.array(OpenTaskRowSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number()
  })
);

/** Per-tab thread counts for the CVMLRL / Essay dashboards. */
export const ActiveThreadsCountsSchema = z.object({
  all: z.number(),
  closed: z.number(),
  withdraw: z.number(),
  in_progress: z.number(),
  no_input: z.number(),
  no_writer: z.number(),
  new_message: z.number(),
  fav: z.number(),
  followup: z.number(),
  pending_progress: z.number()
});

export const GetActiveThreadsCountsResponseSchema = createApiResponseSchema(
  ActiveThreadsCountsSchema
);

/**
 * `GET /api/document-threads/overview/taiger-user/:userId` — the user's threads
 * and the user themselves, so the page can title itself without a second call.
 */
export const GetMyStudentsThreadsResponseSchema = createApiResponseSchema(
  z.object({
    threads: z.array(z.unknown()),
    user: z.unknown().optional()
  })
);

/** `GET /api/document-threads/overview/my-student-metrics`. */
export const GetMyStudentMetricsResponseSchema = createApiResponseSchema(
  z.object({ students: z.array(z.unknown()) })
);

/**
 * `POST /api/document-threads/:studentId/forward-documents`.
 *
 * `status` distinguishes a send from the "some documents have no file" answer,
 * which the client turns into a confirm-and-retry.
 */
export const ForwardStudentDocumentsResponseSchema = createApiResponseSchema(
  z
    .object({
      status: z.string().optional(),
      missing: z.array(z.string()).optional()
    })
    .catchall(z.unknown())
);

/** `PUT /api/document-threads/:messagesThreadId/additional-information`. */
export const UpdateAdditionalInformationResponseSchema =
  createApiResponseSchema(z.object({ additionalInformation: z.string() }));

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

/** One row of the CVMLRL / Essay dashboards. */
export type OpenTaskRow = z.infer<typeof OpenTaskRowSchema>;

/** GET /api/document-threads/overview/{all,taiger-user/:userId}/paginated */
export type GetActiveThreadsPaginatedResponse = z.infer<
  typeof GetActiveThreadsPaginatedResponseSchema
>;

/** Per-tab thread counts. */
export type ActiveThreadsCounts = z.infer<typeof ActiveThreadsCountsSchema>;

/** GET /api/document-threads/overview/{all,taiger-user/:userId}/counts */
export type GetActiveThreadsCountsResponse = z.infer<
  typeof GetActiveThreadsCountsResponseSchema
>;

/** GET /api/document-threads/overview/taiger-user/:userId */
export type GetMyStudentsThreadsResponse = z.infer<
  typeof GetMyStudentsThreadsResponseSchema
>;

/** GET /api/document-threads/overview/my-student-metrics */
export type GetMyStudentMetricsResponse = z.infer<
  typeof GetMyStudentMetricsResponseSchema
>;

/** POST /api/document-threads/:studentId/forward-documents */
export type ForwardStudentDocumentsResponse = z.infer<
  typeof ForwardStudentDocumentsResponseSchema
>;

/** PUT /api/document-threads/:messagesThreadId/additional-information */
export type UpdateAdditionalInformationResponse = z.infer<
  typeof UpdateAdditionalInformationResponseSchema
>;
