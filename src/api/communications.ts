import { z } from 'zod';
import {
  SuccessResponseSchema,
  createApiResponseSchema,
  createNullableApiResponseSchema
} from './common';
import { CommunicationWithIdSchema, UserWithIdSchema } from './serialized';

// =========== Schemas ===========

/**
 * One row of the chat inbox: a student, plus their newest message.
 *
 * The handler merges an aggregation result into a projected student document,
 * so the exact key set depends on which of the three aggregations produced it;
 * `catchall` keeps the extra keys rather than pretending they are absent.
 */
export const CommunicationStudentSummarySchema = z
  .object({
    _id: z.string().optional(),
    firstname: z.string().nullish(),
    lastname: z.string().nullish(),
    firstname_chinese: z.string().nullish(),
    lastname_chinese: z.string().nullish(),
    role: z.string().optional(),
    pictureUrl: z.string().nullish(),
    latestCommunication: z.unknown().optional()
  })
  .catchall(z.unknown());

/**
 * `GET /api/communications/:studentId` and `.../pages/:pageNumber`.
 *
 * Both send the thread **and** the student it belongs to; this used to declare
 * only the message array, so the student the chat header renders from was
 * undocumented.
 */
export const GetCommunicationThreadResponseSchema = createApiResponseSchema(
  z.array(CommunicationWithIdSchema)
).extend({
  student: z.unknown().optional()
});

/**
 * `GET /api/communications/all` — the inbox: one row per student the caller can
 * see, plus the caller. Not an array of messages, which is what this said.
 */
export const GetMyCommunicationThreadResponseSchema = createApiResponseSchema(
  z.object({
    students: z.array(CommunicationStudentSummarySchema),
    user: UserWithIdSchema
  })
);

/** `GET /api/communications?q=` — the same inbox shape, filtered by a search. */
export const SearchUserMessagesResponseSchema =
  GetMyCommunicationThreadResponseSchema;

// --- Per-user drafts (one saved-but-unsent message per student thread) ---

export const CommunicationDraftFileSchema = z.object({
  name: z.string(),
  /** The S3 key the file is staged under until the message is sent. */
  path: z.string()
});

export const CommunicationDraftSchema = z.object({
  /**
   * `id`, not `_id`: the draft DAO is deliberately persistence-agnostic and
   * maps the Mongo `_id` to a plain `id` before anything above it sees the
   * record. The frontend's hand-written type said `_id`, which no response has
   * ever carried.
   */
  id: z.string(),
  user_id: z.string(),
  student_id: z.string(),
  message: z.string(),
  /**
   * Provenance: `'ai'` once an AI-generated reply was inserted, and it stays
   * `'ai'` through later edits so an assisted send can be audited.
   */
  source: z.enum(['human', 'ai']),
  aiModel: z.string().optional(),
  aiOriginalMessage: z.string().optional(),
  aiGeneratedAt: z.coerce.date().optional(),
  /** A generated-but-unapproved reply, kept out of `message`. */
  aiPendingSuggestion: z.string().optional(),
  aiPendingModel: z.string().optional(),
  files: z.array(CommunicationDraftFileSchema),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date()
});

/** `null` is the normal answer: most conversations have no draft. */
export const CommunicationDraftResponseSchema =
  createNullableApiResponseSchema(CommunicationDraftSchema);

export const DeleteCommunicationDraftResponseSchema = SuccessResponseSchema;

export const UploadCommunicationDraftFilesResponseSchema =
  createApiResponseSchema(
    z.object({
      files: z.array(CommunicationDraftFileSchema),
      draft: CommunicationDraftSchema.nullish()
    })
  );

// --- In-thread search and jump-to-message ---

export const ThreadSearchMessageSchema = z
  .object({
    _id: z.string(),
    message: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    user_id: z
      .object({
        _id: z.string().optional(),
        firstname: z.string().nullish(),
        lastname: z.string().nullish(),
        pictureUrl: z.string().nullish()
      })
      .optional()
  })
  .catchall(z.unknown());

export const SearchCommunicationThreadResponseSchema = createApiResponseSchema(
  z.array(ThreadSearchMessageSchema)
).extend({
  total: z.number().optional()
});

/** The messages around a jumped-to search hit, and which way more exist. */
export const GetThreadContextResponseSchema = createApiResponseSchema(
  z.array(CommunicationWithIdSchema)
).extend({
  hasOlder: z.boolean().optional(),
  hasNewer: z.boolean().optional(),
  targetId: z.string().optional()
});

export const GetAdjacentThreadMessagesResponseSchema = createApiResponseSchema(
  z.array(CommunicationWithIdSchema)
).extend({
  hasMore: z.boolean().optional(),
  direction: z.enum(['before', 'after']).optional()
});

export const GetCommunicationUnreadNumberResponseSchema = createApiResponseSchema(z.number());

/**
 * `POST /api/communications/:studentId` answers with the newest page of the
 * thread (a one-element array), not the single message this used to declare —
 * the controller carried a note about the mismatch and cast around it.
 */
export const PostCommunicationResponseSchema = createApiResponseSchema(
  z.array(CommunicationWithIdSchema)
);

export const LoadCommunicationThreadResponseSchema = createApiResponseSchema(
  z.array(CommunicationWithIdSchema)
);

export const UpdateCommunicationMessageResponseSchema = createApiResponseSchema(
  CommunicationWithIdSchema
);

export const DeleteCommunicationMessageResponseSchema = SuccessResponseSchema;

export const IgnoreCommunicationMessageResponseSchema = createApiResponseSchema(
  CommunicationWithIdSchema
);

// =========== Inferred types ===========

/** GET /api/communications/:studentId */
export type GetCommunicationThreadResponse = z.infer<typeof GetCommunicationThreadResponseSchema>;

/** GET /api/communications/all */
export type GetMyCommunicationThreadResponse = z.infer<
  typeof GetMyCommunicationThreadResponseSchema
>;

/** GET /api/communications/ping/all */
export type GetCommunicationUnreadNumberResponse = z.infer<
  typeof GetCommunicationUnreadNumberResponseSchema
>;

/** POST /api/communications/:studentId */
export type PostCommunicationResponse = z.infer<typeof PostCommunicationResponseSchema>;

/** GET /api/communications/:studentId/pages/:pageNumber */
export type LoadCommunicationThreadResponse = z.infer<typeof LoadCommunicationThreadResponseSchema>;

/** PUT /api/communications/:communication_id/:communication_messageId */
export type UpdateCommunicationMessageResponse = z.infer<
  typeof UpdateCommunicationMessageResponseSchema
>;

/** DELETE /api/communications/:student_id/:communication_messageId */
export type DeleteCommunicationMessageResponse = z.infer<
  typeof DeleteCommunicationMessageResponseSchema
>;

/** PUT /api/communications/:student_id/:communication_messageId/:ignoreMessageState/ignore */
export type IgnoreCommunicationMessageResponse = z.infer<
  typeof IgnoreCommunicationMessageResponseSchema
>;

/** One row of the chat inbox. */
export type CommunicationStudentSummary = z.infer<
  typeof CommunicationStudentSummarySchema
>;

/** GET /api/communications?q= */
export type SearchUserMessagesResponse = z.infer<
  typeof SearchUserMessagesResponseSchema
>;

/** An attachment staged on a draft. */
export type CommunicationDraftFile = z.infer<typeof CommunicationDraftFileSchema>;

/** A saved-but-unsent message for one (user, student) conversation. */
export type CommunicationDraft = z.infer<typeof CommunicationDraftSchema>;

/** GET / PUT /api/communications/:studentId/draft */
export type CommunicationDraftResponse = z.infer<
  typeof CommunicationDraftResponseSchema
>;

/** DELETE /api/communications/:studentId/draft */
export type DeleteCommunicationDraftResponse = z.infer<
  typeof DeleteCommunicationDraftResponseSchema
>;

/** POST /api/communications/:studentId/draft/files */
export type UploadCommunicationDraftFilesResponse = z.infer<
  typeof UploadCommunicationDraftFilesResponseSchema
>;

/** One hit from an in-thread search. */
export type ThreadSearchMessage = z.infer<typeof ThreadSearchMessageSchema>;

/** GET /api/communications/:studentId/search */
export type SearchCommunicationThreadResponse = z.infer<
  typeof SearchCommunicationThreadResponseSchema
>;

/** GET /api/communications/:studentId/context/:messageId */
export type GetThreadContextResponse = z.infer<
  typeof GetThreadContextResponseSchema
>;

/** GET /api/communications/:studentId/adjacent/:messageId */
export type GetAdjacentThreadMessagesResponse = z.infer<
  typeof GetAdjacentThreadMessagesResponseSchema
>;
