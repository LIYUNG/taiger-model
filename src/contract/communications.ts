import { z } from 'zod';

import {
  CommunicationDraftResponseSchema,
  DeleteCommunicationDraftResponseSchema,
  DeleteCommunicationMessageResponseSchema,
  GetAdjacentThreadMessagesResponseSchema,
  GetCommunicationThreadResponseSchema,
  GetCommunicationUnreadNumberResponseSchema,
  GetMyCommunicationThreadResponseSchema,
  GetThreadContextResponseSchema,
  IgnoreCommunicationMessageResponseSchema,
  PostCommunicationResponseSchema,
  SearchCommunicationThreadResponseSchema,
  SearchUserMessagesResponseSchema,
  UpdateCommunicationMessageResponseSchema,
  UploadCommunicationDraftFilesResponseSchema
} from '../api/communications';
import { defineContract } from './types';

/**
 * The student chat: the inbox, one conversation's messages, and the per-user
 * draft that sits under the composer.
 */

const StudentParams = z.object({ studentId: z.string().min(1) });

const StudentMessageParams = z.object({
  studentId: z.string().min(1),
  messageId: z.string().min(1)
});

export const communicationsContract = {
  searchUserMessages: defineContract({
    method: 'get',
    path: '/api/communications',
    tags: ['Communications'],
    summary: 'Search the chat inbox by student name',
    query: z.object({ q: z.string().optional() }),
    response: SearchUserMessagesResponseSchema
  }),

  getUnreadNumberMessages: defineContract({
    method: 'get',
    path: '/api/communications/ping/all',
    tags: ['Communications'],
    summary: 'Count conversations with an unread newest message',
    response: GetCommunicationUnreadNumberResponseSchema
  }),

  getMyMessages: defineContract({
    method: 'get',
    path: '/api/communications/all',
    tags: ['Communications'],
    summary: 'Get the chat inbox',
    response: GetMyCommunicationThreadResponseSchema
  }),

  searchThreadMessages: defineContract({
    method: 'get',
    path: '/api/communications/:studentId/search',
    tags: ['Communications'],
    summary: "Search one student's chat history",
    params: StudentParams,
    /** Under two characters the handler answers an empty page rather than scanning. */
    query: z.object({ q: z.string().optional() }),
    response: SearchCommunicationThreadResponseSchema
  }),

  getThreadContextMessages: defineContract({
    method: 'get',
    path: '/api/communications/:studentId/context/:messageId',
    tags: ['Communications'],
    summary: 'Get the messages around one message',
    params: StudentMessageParams,
    response: GetThreadContextResponseSchema
  }),

  getAdjacentThreadMessages: defineContract({
    method: 'get',
    path: '/api/communications/:studentId/adjacent/:messageId',
    tags: ['Communications'],
    summary: 'Get the chunk of messages before or after a message',
    params: StudentMessageParams,
    query: z.object({ direction: z.enum(['before', 'after']).optional() }),
    response: GetAdjacentThreadMessagesResponseSchema
  }),

  /**
   * The three draft routes are declared before `/:studentId/:messageId` so
   * `draft` is matched as the literal segment it is.
   */
  getCommunicationDraft: defineContract({
    method: 'get',
    path: '/api/communications/:studentId/draft',
    tags: ['Communications'],
    summary: 'Get the saved draft for a conversation',
    params: StudentParams,
    response: CommunicationDraftResponseSchema
  }),

  upsertCommunicationDraft: defineContract({
    method: 'put',
    path: '/api/communications/:studentId/draft',
    tags: ['Communications'],
    summary: 'Save the draft for a conversation',
    params: StudentParams,
    body: z.object({
      /** EditorJS output, serialised. An empty one deletes the draft. */
      message: z.string(),
      /** `'ai'` stamps provenance on the saved text. */
      source: z.enum(['human', 'ai']).optional(),
      aiModel: z.string().optional()
    }),
    response: CommunicationDraftResponseSchema
  }),

  deleteCommunicationDraft: defineContract({
    method: 'delete',
    path: '/api/communications/:studentId/draft',
    tags: ['Communications'],
    summary: 'Discard the draft and its staged attachments',
    params: StudentParams,
    response: DeleteCommunicationDraftResponseSchema
  }),

  setCommunicationDraftAiSuggestion: defineContract({
    method: 'put',
    path: '/api/communications/:studentId/draft/ai-suggestion',
    tags: ['Communications'],
    summary: 'Store a generated-but-unapproved AI reply',
    params: StudentParams,
    body: z.object({
      /** An empty suggestion clears the pending one. */
      suggestion: z.string().optional(),
      aiModel: z.string().optional()
    }),
    response: CommunicationDraftResponseSchema
  }),

  uploadCommunicationDraftFiles: defineContract({
    method: 'post',
    path: '/api/communications/:studentId/draft/files',
    tags: ['Communications'],
    summary: 'Attach files to a draft',
    params: StudentParams,
    response: UploadCommunicationDraftFilesResponseSchema
  }),

  deleteCommunicationDraftFile: defineContract({
    method: 'delete',
    path: '/api/communications/:studentId/draft/files',
    tags: ['Communications'],
    summary: 'Remove one attachment from a draft',
    params: StudentParams,
    body: z.object({
      /** The S3 key; it must belong to this user's own draft. */
      path: z.string().min(1)
    }),
    response: CommunicationDraftResponseSchema
  }),

  ignoreMessage: defineContract({
    method: 'put',
    path: '/api/communications/:studentId/:communication_messageId/:ignoreMessageState/ignore',
    tags: ['Communications'],
    summary: 'Ignore or un-ignore a message',
    params: z.object({
      studentId: z.string().min(1),
      communication_messageId: z.string().min(1),
      ignoreMessageState: z.string().min(1)
    }),
    response: IgnoreCommunicationMessageResponseSchema
  }),

  updateMessage: defineContract({
    method: 'put',
    path: '/api/communications/:studentId/:messageId',
    tags: ['Communications'],
    summary: 'Edit a message',
    params: StudentMessageParams,
    body: z.object({
      /** Serialised editor state; stored verbatim. */
      message: z.string()
    }),
    response: UpdateCommunicationMessageResponseSchema
  }),

  deleteMessage: defineContract({
    method: 'delete',
    path: '/api/communications/:studentId/:messageId',
    tags: ['Communications'],
    summary: 'Delete a message',
    params: StudentMessageParams,
    response: DeleteCommunicationMessageResponseSchema
  }),

  postMessages: defineContract({
    method: 'post',
    path: '/api/communications/:studentId',
    tags: ['Communications'],
    summary: 'Post a message to a conversation',
    params: StudentParams,
    response: PostCommunicationResponseSchema
  }),

  getMessages: defineContract({
    method: 'get',
    path: '/api/communications/:studentId',
    tags: ['Communications'],
    summary: 'Get the newest page of a conversation',
    params: StudentParams,
    response: GetCommunicationThreadResponseSchema
  }),

  getChatFile: defineContract({
    method: 'get',
    path: '/api/communications/:studentId/chat/:fileName',
    tags: ['Communications'],
    summary: 'Download a chat attachment',
    params: z.object({
      studentId: z.string().min(1),
      /** The opaque storage key segment, not the display name. */
      fileName: z.string().min(1)
    }),
    query: z.object({
      /** The friendly download name; legacy files fall back to `fileName`. */
      name: z.string().optional()
    }),
    successContentType: 'application/octet-stream',
    response: z.unknown()
  }),

  loadMessages: defineContract({
    method: 'get',
    path: '/api/communications/:studentId/pages/:pageNumber',
    tags: ['Communications'],
    summary: 'Get one older page of a conversation',
    params: z.object({
      studentId: z.string().min(1),
      pageNumber: z.string().min(1)
    }),
    response: GetCommunicationThreadResponseSchema
  })
} as const;
