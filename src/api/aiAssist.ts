import { z } from 'zod';
import {
  createApiResponseSchema,
  createNullableApiResponseSchema
} from './common';

/**
 * AI-Assist: the staff-facing assistant (conversations, skills, the student
 * picker and the portfolio overview) and the CV-draft workflow that hangs off
 * it.
 *
 * These shapes lived only in the frontend until the router was migrated; the
 * server had no declaration of them at all.
 */

// =========== Conversations ===========

export const AIAssistConversationSchema = z.object({
  id: z.string(),
  ownerUserId: z.string().optional(),
  ownerRole: z.string().optional(),
  title: z.string(),
  studentId: z.string().nullish(),
  studentDisplayName: z.string().nullish(),
  status: z.string().optional(),
  // Postgres columns: an unset timestamp is NULL.
  createdAt: z.union([z.string(), z.coerce.date()]).nullish(),
  updatedAt: z.union([z.string(), z.coerce.date()]).nullish()
});

/**
 * One row of the @-mention student picker, as `normalizeStudentPickerRow`
 * builds it.
 *
 * `id` and `name` are optional because the normalizer derives them — `name` is
 * assembled from the name parts and is undefined when there are none. The
 * recent-students list adds `conversationId` and `studentDisplayName`.
 */
export const AIAssistPickerStudentSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  chineseName: z.string().optional(),
  email: z.string().nullish(),
  role: z.string().nullish(),
  archived: z.boolean().optional(),
  applyingProgramCount: z.number().nullish(),
  agents: z.array(z.unknown()).optional(),
  editors: z.array(z.unknown()).optional(),
  conversationId: z.string().optional(),
  studentDisplayName: z.string().optional()
});

export const AIAssistQuickSkillSchema = z.enum([
  'summarize_student',
  'identify_risk',
  'review_messages',
  'review_messages_recent',
  'review_messages_all',
  'review_document_threads',
  'summarize_lead_meetings',
  'review_open_tasks'
]);

export const AIAssistMentionedStudentSchema = z.object({
  id: z.string(),
  displayName: z.string()
});

/** What the composer resolved from the message before the model ran. */
export const AIAssistAssistContextSchema = z.object({
  mentionedStudent: AIAssistMentionedStudentSchema.optional(),
  requestedSkill: AIAssistQuickSkillSchema.optional(),
  unknownSkillText: z.string().optional(),
  analysisMode: z.boolean().optional()
});

export const AIAssistSkillTraceSchema = z.object({
  source: z.string().optional(),
  requestedSkill: AIAssistQuickSkillSchema.nullish(),
  resolvedSkill: AIAssistQuickSkillSchema.nullish(),
  unknownSkillText: z.string().nullish(),
  mode: z.string().optional(),
  student: AIAssistMentionedStudentSchema.nullish(),
  status: z.string().optional(),
  steps: z.array(z.unknown()).optional(),
  fallbackReason: z.string().nullish()
});

/** An entity the answer referred to, so the UI can link it. */
export const AIAssistMessageLinkHintSchema = z.object({
  entityType: z.enum(['student', 'program']),
  entityId: z.string()
});

export const AIAssistMessageSchema = z.object({
  id: z.string(),
  conversationId: z.string().optional(),
  /**
   * A plain string, not a union: the column is `varchar` and nothing constrains
   * it at the boundary, so promising the three known values would be a promise
   * the store does not keep.
   */
  role: z.string(),
  content: z.string(),
  skillTrace: AIAssistSkillTraceSchema.nullish(),
  linkHints: z.record(AIAssistMessageLinkHintSchema).nullish(),
  model: z.string().nullish(),
  responseId: z.string().nullish(),
  usage: z.record(z.unknown()).nullish(),
  createdAt: z.union([z.string(), z.coerce.date()]).nullish()
});

export const AIAssistToolCallSchema = z.object({
  id: z.string(),
  conversationId: z.string().optional(),
  assistantMessageId: z.string().nullish(),
  toolName: z.string(),
  arguments: z.unknown().nullish(),
  result: z.unknown().nullish(),
  status: z.string(),
  durationMs: z.number().nullish(),
  permissionOutcome: z.unknown().nullish(),
  errorCode: z.string().nullish(),
  errorMessage: z.string().nullish(),
  createdAt: z.union([z.string(), z.coerce.date()]).nullish()
});

export const GetAIAssistConversationsResponseSchema = createApiResponseSchema(
  z.array(AIAssistConversationSchema)
);

export const CreateAIAssistConversationResponseSchema =
  createApiResponseSchema(AIAssistConversationSchema);

export const GetAIAssistConversationResponseSchema = createApiResponseSchema(
  z.object({
    conversation: AIAssistConversationSchema,
    messages: z.array(AIAssistMessageSchema),
    trace: z.array(AIAssistToolCallSchema)
  })
);

export const UpdateAIAssistConversationResponseSchema =
  createApiResponseSchema(AIAssistConversationSchema);

export const DeleteAIAssistConversationResponseSchema =
  createApiResponseSchema(AIAssistConversationSchema);

const AIAssistAnswerSchema = z.object({
  userMessage: AIAssistMessageSchema,
  assistantMessage: AIAssistMessageSchema,
  answer: z.string(),
  trace: z.array(AIAssistToolCallSchema),
  /** `null` when the answer did not go through a skill. */
  skillTrace: AIAssistSkillTraceSchema.nullish(),
  /** The provider's token accounting, passed through as-is. */
  usage: z.unknown().nullish(),
  /** The student the answer was about, when one was resolved. */
  activeStudent: AIAssistMentionedStudentSchema.nullish()
});

export const PostAIAssistMessageResponseSchema =
  createApiResponseSchema(AIAssistAnswerSchema);

export const PostAIAssistFirstMessageResponseSchema = createApiResponseSchema(
  AIAssistAnswerSchema.extend({ conversation: AIAssistConversationSchema })
);

export const GetAIAssistPickerStudentsResponseSchema =
  createApiResponseSchema(z.array(AIAssistPickerStudentSchema));

export const GetAIAssistOverviewResponseSchema = createApiResponseSchema(
  z.unknown()
);

/** `null` when the student has never been analysed — a normal answer. */
export const GetAIAssistLatestAnalysisResponseSchema =
  createNullableApiResponseSchema(z.unknown());

export const GenerateReplyDraftResponseSchema = createApiResponseSchema(
  z.unknown()
);

// =========== CV draft ===========

/** The draft document itself; its inner shape lives in the CV service. */
export const CVDraftSchema = z.unknown();

export const CVDraftResultSchema = z
  .object({
    draft: CVDraftSchema.optional(),
    validation: z.unknown().optional(),
    checklist: z.array(z.unknown()).optional(),
    meta: z.unknown().optional(),
    hasPhoto: z.boolean().optional(),
    renderedCurrent: z.boolean().optional(),
    rendered: z
      .object({
        name: z.string().nullish(),
        path: z.string().nullish(),
        photoEmbedded: z.boolean().nullish()
      })
      .nullish(),
    inputsChanged: z.boolean().optional(),
    history: z.array(z.unknown()).optional()
  })
  .catchall(z.unknown());

export const GenerateCVDraftResponseSchema =
  createApiResponseSchema(CVDraftResultSchema);

/** `null` when no draft has been saved for the thread yet. */
export const GetSavedCVDraftResponseSchema =
  createNullableApiResponseSchema(CVDraftResultSchema);

export const UpdateCVDraftResponseSchema =
  createApiResponseSchema(CVDraftResultSchema);

/**
 * The rendered docx. `reused` is true when the stored render was still current
 * and nothing was re-rendered.
 */
export const RenderCVDraftResponseSchema = createApiResponseSchema(
  z.object({
    name: z.string().nullish(),
    path: z.string().nullish(),
    hash: z.string().optional(),
    reused: z.boolean().optional(),
    photoEmbedded: z.boolean().nullish()
  })
);

export const AttachCVDraftResponseSchema = createApiResponseSchema(
  z.object({
    name: z.string().nullish(),
    path: z.string().nullish(),
    photoEmbedded: z.boolean().nullish()
  })
);

export const ValidateCVDraftResponseSchema = createApiResponseSchema(
  z.object({ validation: z.unknown() })
);

export const GetCVReadinessResponseSchema = createApiResponseSchema(
  z.object({ readiness: z.array(z.unknown()) })
);

/** `quota` is null for a user with no permission record. */
export const GetAiQuotaResponseSchema = createApiResponseSchema(
  z.object({
    quota: z.number().nullable(),
    canUse: z.boolean()
  })
);

// =========== Inferred types ===========

export type AIAssistConversation = z.infer<typeof AIAssistConversationSchema>;
export type AIAssistPickerStudent = z.infer<
  typeof AIAssistPickerStudentSchema
>;
export type AIAssistQuickSkill = z.infer<typeof AIAssistQuickSkillSchema>;
export type AIAssistMentionedStudent = z.infer<
  typeof AIAssistMentionedStudentSchema
>;
export type AIAssistAssistContext = z.infer<
  typeof AIAssistAssistContextSchema
>;
export type AIAssistSkillTrace = z.infer<typeof AIAssistSkillTraceSchema>;
export type AIAssistMessageLinkHint = z.infer<
  typeof AIAssistMessageLinkHintSchema
>;
export type AIAssistMessage = z.infer<typeof AIAssistMessageSchema>;
export type AIAssistToolCall = z.infer<typeof AIAssistToolCallSchema>;

/** GET /api/ai-assist/conversations */
export type GetAIAssistConversationsResponse = z.infer<
  typeof GetAIAssistConversationsResponseSchema
>;

/** POST /api/ai-assist/conversations */
export type CreateAIAssistConversationResponse = z.infer<
  typeof CreateAIAssistConversationResponseSchema
>;

/** GET /api/ai-assist/conversations/:conversationId */
export type GetAIAssistConversationResponse = z.infer<
  typeof GetAIAssistConversationResponseSchema
>;

/** PATCH /api/ai-assist/conversations/:conversationId */
export type UpdateAIAssistConversationResponse = z.infer<
  typeof UpdateAIAssistConversationResponseSchema
>;

/** DELETE /api/ai-assist/conversations/:conversationId */
export type DeleteAIAssistConversationResponse = z.infer<
  typeof DeleteAIAssistConversationResponseSchema
>;

/** POST /api/ai-assist/conversations/:conversationId/messages */
export type PostAIAssistMessageResponse = z.infer<
  typeof PostAIAssistMessageResponseSchema
>;

/** POST /api/ai-assist/conversations/first-message */
export type PostAIAssistFirstMessageResponse = z.infer<
  typeof PostAIAssistFirstMessageResponseSchema
>;

/** GET /api/ai-assist/students/{recent,mine,search} */
export type GetAIAssistPickerStudentsResponse = z.infer<
  typeof GetAIAssistPickerStudentsResponseSchema
>;

/** GET /api/ai-assist/overview */
export type GetAIAssistOverviewResponse = z.infer<
  typeof GetAIAssistOverviewResponseSchema
>;

/** GET /api/ai-assist/students/:studentId/latest-analysis */
export type GetAIAssistLatestAnalysisResponse = z.infer<
  typeof GetAIAssistLatestAnalysisResponseSchema
>;

export type CVDraftResult = z.infer<typeof CVDraftResultSchema>;

/** POST /api/ai-assist/students/:studentId/cv-draft */
export type GenerateCVDraftResponse = z.infer<
  typeof GenerateCVDraftResponseSchema
>;

/** GET /api/ai-assist/threads/:documentsthreadId/cv-draft */
export type GetSavedCVDraftResponse = z.infer<
  typeof GetSavedCVDraftResponseSchema
>;

/** PUT /api/ai-assist/threads/:documentsthreadId/cv-draft */
export type UpdateCVDraftResponse = z.infer<
  typeof UpdateCVDraftResponseSchema
>;

/** POST /api/ai-assist/students/:studentId/cv-draft/render */
export type RenderCVDraftResponse = z.infer<
  typeof RenderCVDraftResponseSchema
>;

/** POST /api/ai-assist/threads/:documentsthreadId/cv-draft/attach */
export type AttachCVDraftResponse = z.infer<
  typeof AttachCVDraftResponseSchema
>;

/** POST /api/ai-assist/students/:studentId/cv-draft/validate */
export type ValidateCVDraftResponse = z.infer<
  typeof ValidateCVDraftResponseSchema
>;

/** GET /api/ai-assist/students/:studentId/cv-draft/readiness */
export type GetCVReadinessResponse = z.infer<
  typeof GetCVReadinessResponseSchema
>;

/** GET /api/ai-assist/ai-quota */
export type GetAiQuotaResponse = z.infer<typeof GetAiQuotaResponseSchema>;
