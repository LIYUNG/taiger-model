import { z } from 'zod';

import {
  AIAssistAssistContextSchema,
  AttachCVDraftResponseSchema,
  CreateAIAssistConversationResponseSchema,
  DeleteAIAssistConversationResponseSchema,
  GenerateCVDraftResponseSchema,
  GenerateReplyDraftResponseSchema,
  GetAIAssistConversationResponseSchema,
  GetAIAssistConversationsResponseSchema,
  GetAIAssistLatestAnalysisResponseSchema,
  GetAIAssistOverviewResponseSchema,
  GetAIAssistPickerStudentsResponseSchema,
  GetAiQuotaResponseSchema,
  GetCVReadinessResponseSchema,
  GetSavedCVDraftResponseSchema,
  PostAIAssistFirstMessageResponseSchema,
  PostAIAssistMessageResponseSchema,
  RenderCVDraftResponseSchema,
  UpdateAIAssistConversationResponseSchema,
  UpdateCVDraftResponseSchema,
  ValidateCVDraftResponseSchema
} from '../api/aiAssist';
import { defineContract } from './types';

/**
 * AI-Assist: the staff assistant and the CV-draft workflow.
 *
 * Three of these also stream. With `?stream=1` the handler switches to
 * server-sent events and pushes progress, tokens and a final payload; without
 * it, it answers once with the JSON below. The response schema describes the
 * non-streaming answer, which is also what the final SSE event carries — a
 * streaming client reads it with its own transport rather than `callApi`.
 */

const StudentParams = z.object({ studentId: z.string().min(1) });
const ThreadParams = z.object({ documentsthreadId: z.string().min(1) });
const ConversationParams = z.object({ conversationId: z.string().min(1) });

/** Set to `1` to receive the answer as server-sent events. */
const StreamQuery = z.object({ stream: z.string().optional() });

const MessageBodySchema = z.object({
  message: z.string(),
  assistContext: AIAssistAssistContextSchema.optional(),
  preferredLanguage: z.string().optional()
});

export const aiAssistContract = {
  listConversations: defineContract({
    method: 'get',
    path: '/api/ai-assist/conversations',
    tags: ['AI Assist'],
    summary: 'List the caller conversations',
    response: GetAIAssistConversationsResponseSchema
  }),

  createConversation: defineContract({
    method: 'post',
    path: '/api/ai-assist/conversations',
    tags: ['AI Assist'],
    summary: 'Start a conversation',
    successStatus: 201,
    response: CreateAIAssistConversationResponseSchema
  }),

  getOverview: defineContract({
    method: 'get',
    path: '/api/ai-assist/overview',
    tags: ['AI Assist'],
    summary: 'Get the portfolio overview',
    query: z.object({ days: z.string().optional() }),
    response: GetAIAssistOverviewResponseSchema
  }),

  listRecentStudents: defineContract({
    method: 'get',
    path: '/api/ai-assist/students/recent',
    tags: ['AI Assist'],
    summary: 'List recently discussed students',
    response: GetAIAssistPickerStudentsResponseSchema
  }),

  listMyStudents: defineContract({
    method: 'get',
    path: '/api/ai-assist/students/mine',
    tags: ['AI Assist'],
    summary: 'List the caller supervised students',
    response: GetAIAssistPickerStudentsResponseSchema
  }),

  searchStudents: defineContract({
    method: 'get',
    path: '/api/ai-assist/students/search',
    tags: ['AI Assist'],
    summary: 'Search students for the @-mention picker',
    query: z.object({
      q: z.string().optional(),
      /** Page size; the service clamps it. */
      limit: z.string().optional()
    }),
    response: GetAIAssistPickerStudentsResponseSchema
  }),

  getLatestStudentAnalysis: defineContract({
    method: 'get',
    path: '/api/ai-assist/students/:studentId/latest-analysis',
    tags: ['AI Assist'],
    summary: 'Get the most recent analysis of a student',
    params: StudentParams,
    response: GetAIAssistLatestAnalysisResponseSchema
  }),

  generateReplyDraft: defineContract({
    method: 'post',
    path: '/api/ai-assist/students/:studentId/reply-draft',
    tags: ['AI Assist'],
    summary: 'Draft a reply to a student',
    description:
      'Consumes one TaiGer AI credit. Streams with `?stream=1`.',
    params: StudentParams,
    query: StreamQuery,
    response: GenerateReplyDraftResponseSchema
  }),

  generateCvDraft: defineContract({
    method: 'post',
    path: '/api/ai-assist/students/:studentId/cv-draft',
    tags: ['AI Assist'],
    summary: 'Generate a CV draft',
    description: 'Consumes one TaiGer AI credit.',
    params: StudentParams,
    response: GenerateCVDraftResponseSchema
  }),

  getMyAiQuota: defineContract({
    method: 'get',
    path: '/api/ai-assist/ai-quota',
    tags: ['AI Assist'],
    summary: 'Get the caller remaining AI quota',
    response: GetAiQuotaResponseSchema
  }),

  getCvReadiness: defineContract({
    method: 'get',
    path: '/api/ai-assist/students/:studentId/cv-draft/readiness',
    tags: ['AI Assist'],
    summary: 'Check what a CV draft could be filled from, before generating',
    params: StudentParams,
    response: GetCVReadinessResponseSchema
  }),

  validateCvDraft: defineContract({
    method: 'post',
    path: '/api/ai-assist/students/:studentId/cv-draft/validate',
    tags: ['AI Assist'],
    summary: 'Validate a reviewed CV draft',
    params: StudentParams,
    response: ValidateCVDraftResponseSchema
  }),

  renderCvDraft: defineContract({
    method: 'post',
    path: '/api/ai-assist/students/:studentId/cv-draft/render',
    tags: ['AI Assist'],
    summary: 'Render a CV draft to docx',
    params: StudentParams,
    response: RenderCVDraftResponseSchema
  }),

  downloadCvDraft: defineContract({
    method: 'post',
    path: '/api/ai-assist/students/:studentId/cv-draft/render/download',
    tags: ['AI Assist'],
    summary: 'Render a CV draft and stream the docx back',
    params: StudentParams,
    successContentType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    response: z.unknown()
  }),

  getSavedCvDraft: defineContract({
    method: 'get',
    path: '/api/ai-assist/threads/:documentsthreadId/cv-draft',
    tags: ['AI Assist'],
    summary: 'Get the saved CV draft for a thread',
    params: ThreadParams,
    response: GetSavedCVDraftResponseSchema
  }),

  updateCvDraft: defineContract({
    method: 'put',
    path: '/api/ai-assist/threads/:documentsthreadId/cv-draft',
    tags: ['AI Assist'],
    summary: 'Save an edited CV draft',
    params: ThreadParams,
    response: UpdateCVDraftResponseSchema
  }),

  attachCvDraftToThread: defineContract({
    method: 'post',
    path: '/api/ai-assist/threads/:documentsthreadId/cv-draft/attach',
    tags: ['AI Assist'],
    summary: 'Attach the rendered CV draft to the thread',
    params: ThreadParams,
    response: AttachCVDraftResponseSchema
  }),

  sendMessage: defineContract({
    method: 'post',
    path: '/api/ai-assist/conversations/:conversationId/messages',
    tags: ['AI Assist'],
    summary: 'Send a message to a conversation',
    description: 'Streams with `?stream=1`.',
    params: ConversationParams,
    query: StreamQuery,
    body: MessageBodySchema,
    response: PostAIAssistMessageResponseSchema
  }),

  /**
   * Declared before `/conversations/:conversationId` so `first-message` is
   * matched as the literal segment it is.
   */
  sendFirstMessage: defineContract({
    method: 'post',
    path: '/api/ai-assist/conversations/first-message',
    tags: ['AI Assist'],
    summary: 'Start a conversation and answer its first message',
    description: 'Streams with `?stream=1`.',
    query: StreamQuery,
    body: MessageBodySchema,
    response: PostAIAssistFirstMessageResponseSchema
  }),

  getConversation: defineContract({
    method: 'get',
    path: '/api/ai-assist/conversations/:conversationId',
    tags: ['AI Assist'],
    summary: 'Get a conversation with its messages and tool trace',
    params: ConversationParams,
    response: GetAIAssistConversationResponseSchema
  }),

  updateConversation: defineContract({
    method: 'patch',
    path: '/api/ai-assist/conversations/:conversationId',
    tags: ['AI Assist'],
    summary: 'Rename a conversation',
    params: ConversationParams,
    body: z.object({ title: z.string() }),
    response: UpdateAIAssistConversationResponseSchema
  }),

  archiveConversation: defineContract({
    method: 'delete',
    path: '/api/ai-assist/conversations/:conversationId',
    tags: ['AI Assist'],
    summary: 'Archive a conversation',
    params: ConversationParams,
    response: DeleteAIAssistConversationResponseSchema
  })
} as const;
