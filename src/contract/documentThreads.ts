import { z } from 'zod';

import {
  DeleteGeneralFileThreadResponseSchema,
  DeleteMessageInThreadResponseSchema,
  DeleteProgramSpecificFileThreadResponseSchema,
  ForwardStudentDocumentsResponseSchema,
  GetActiveThreadsCountsResponseSchema,
  GetActiveThreadsPaginatedResponseSchema,
  GetActiveThreadsResponseSchema,
  GetCheckDocumentPatternResponseSchema,
  GetMessagesThreadResponseSchema,
  GetMyStudentMetricsResponseSchema,
  GetMyStudentsThreadsResponseSchema,
  GetSurveyInputsResponseSchema,
  GetThreadsByStudentResponseSchema,
  IgnoreMessageThreadResponseSchema,
  InitApplicationThreadResponseSchema,
  InitGeneralThreadResponseSchema,
  PostSurveyInputResponseSchema,
  PutOriginAuthorConfirmedResponseSchema,
  PutSurveyInputResponseSchema,
  PutThreadFavoriteResponseSchema,
  SetFileFinalResponseSchema,
  SubmitMessageResponseSchema,
  UpdateAdditionalInformationResponseSchema,
  UpdateEssayWriterResponseSchema,
  UploadDocumentThreadImageResponseSchema
} from '../api/documentThreads';
import { defineContract } from './types';

/**
 * Document threads: the CV/ML/RL conversations between a student and their
 * editors, the dashboards over them, and the files that hang off each message.
 *
 * The mounting order in `routes/documents_modification.ts` matters and is not
 * accidental — `/:studentId/forward-documents` has to be declared before
 * `/:messagesThreadId/:studentId`, or `forward-documents` is read as a student
 * id. The contract keys below are listed in that same order.
 */

const ThreadParams = z.object({ messagesThreadId: z.string().min(1) });
const StudentParams = z.object({ studentId: z.string().min(1) });

const ThreadStudentParams = z.object({
  messagesThreadId: z.string().min(1),
  studentId: z.string().min(1)
});

/** The dashboards share one filter/sort/page query. */
const ThreadListQuery = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
  tab: z.string().optional(),
  /** Whose threads to score the "new message" flag against. */
  viewerId: z.string().optional(),
  isFinalVersion: z.string().optional(),
  fileType: z.string().optional(),
  studentId: z.string().optional(),
  editorId: z.string().optional(),
  agentId: z.string().optional()
});

/**
 * Split in two only because `tsc` cannot serialise a declaration for a single
 * object literal this large (TS7056) — annotating it would throw away the very
 * inference the contract exists for. The grouping follows the natural seam:
 * the dashboards over many threads, then one thread and its messages.
 */
export const documentThreadsOverviewContract = {
  checkDocumentPattern: defineContract({
    method: 'get',
    path: '/api/document-threads/pattern/check/:messagesThreadId/:file_type',
    tags: ['Document Threads'],
    summary: 'Check an uploaded document against the expected pattern',
    params: z.object({
      messagesThreadId: z.string().min(1),
      file_type: z.string().min(1)
    }),
    response: GetCheckDocumentPatternResponseSchema
  }),

  getMyStudentMetrics: defineContract({
    method: 'get',
    path: '/api/document-threads/overview/my-student-metrics',
    tags: ['Document Threads'],
    summary: "Get per-student task counts for the caller's students",
    response: GetMyStudentMetricsResponseSchema
  }),

  getMyStudentsThreads: defineContract({
    method: 'get',
    path: '/api/document-threads/overview/taiger-user/:userId',
    tags: ['Document Threads'],
    summary: "Get a TaiGer user's threads",
    params: z.object({ userId: z.string().min(1) }),
    query: ThreadListQuery,
    response: GetMyStudentsThreadsResponseSchema
  }),

  getMyStudentsThreadsPaginated: defineContract({
    method: 'get',
    path: '/api/document-threads/overview/taiger-user/:userId/paginated',
    tags: ['Document Threads'],
    summary: "Get one page of a TaiGer user's threads",
    params: z.object({ userId: z.string().min(1) }),
    query: ThreadListQuery,
    response: GetActiveThreadsPaginatedResponseSchema
  }),

  getMyStudentsThreadsCounts: defineContract({
    method: 'get',
    path: '/api/document-threads/overview/taiger-user/:userId/counts',
    tags: ['Document Threads'],
    summary: "Get per-tab counts for a TaiGer user's threads",
    params: z.object({ userId: z.string().min(1) }),
    query: ThreadListQuery,
    response: GetActiveThreadsCountsResponseSchema
  }),

  getActiveThreads: defineContract({
    method: 'get',
    path: '/api/document-threads/overview/all',
    tags: ['Document Threads'],
    summary: 'Get every active thread',
    query: ThreadListQuery,
    response: GetActiveThreadsResponseSchema
  }),

  getActiveThreadsPaginated: defineContract({
    method: 'get',
    path: '/api/document-threads/overview/all/paginated',
    tags: ['Document Threads'],
    summary: 'Get one page of active threads',
    query: ThreadListQuery,
    response: GetActiveThreadsPaginatedResponseSchema
  }),

  getActiveThreadsCounts: defineContract({
    method: 'get',
    path: '/api/document-threads/overview/all/counts',
    tags: ['Document Threads'],
    summary: 'Get per-tab counts over all active threads',
    query: ThreadListQuery,
    response: GetActiveThreadsCountsResponseSchema
  }),

} as const;

export const documentThreadsContract = {
  putSurveyInput: defineContract({
    method: 'put',
    path: '/api/document-threads/survey-input/:surveyInputId',
    tags: ['Document Threads'],
    summary: 'Update a survey answer',
    params: z.object({ surveyInputId: z.string().min(1) }),
    response: PutSurveyInputResponseSchema
  }),

  postSurveyInput: defineContract({
    method: 'post',
    path: '/api/document-threads/survey-input',
    tags: ['Document Threads'],
    summary: 'Create a survey answer',
    response: PostSurveyInputResponseSchema
  }),

  getThreadsByStudent: defineContract({
    method: 'get',
    path: '/api/document-threads/student-threads/:studentId',
    tags: ['Document Threads'],
    summary: "Get a student's threads",
    params: StudentParams,
    response: GetThreadsByStudentResponseSchema
  }),

  initGeneralThread: defineContract({
    method: 'post',
    path: '/api/document-threads/init/general/:studentId/:document_category',
    tags: ['Document Threads'],
    summary: 'Start a general document thread',
    params: z.object({
      studentId: z.string().min(1),
      document_category: z.string().min(1)
    }),
    response: InitGeneralThreadResponseSchema
  }),

  initApplicationThread: defineContract({
    method: 'post',
    path: '/api/document-threads/init/application/:studentId/:application_id/:document_category',
    tags: ['Document Threads'],
    summary: 'Start a program-specific document thread',
    params: z.object({
      studentId: z.string().min(1),
      application_id: z.string().min(1),
      document_category: z.string().min(1)
    }),
    response: InitApplicationThreadResponseSchema
  }),

  assignEssayWriters: defineContract({
    method: 'post',
    path: '/api/document-threads/:messagesThreadId/essay',
    tags: ['Document Threads'],
    summary: 'Assign essay writers to a task',
    params: ThreadParams,
    response: UpdateEssayWriterResponseSchema
  }),

  ignoreMessage: defineContract({
    method: 'put',
    path: '/api/document-threads/:messagesThreadId/:messageId/:ignoreMessageState/ignored',
    tags: ['Document Threads'],
    summary: 'Ignore or un-ignore a message in a thread',
    params: z.object({
      messagesThreadId: z.string().min(1),
      messageId: z.string().min(1),
      ignoreMessageState: z.string().min(1)
    }),
    response: IgnoreMessageThreadResponseSchema
  }),

  putThreadFavorite: defineContract({
    method: 'put',
    path: '/api/document-threads/:messagesThreadId/favorite',
    tags: ['Document Threads'],
    summary: 'Flag or unflag a thread',
    params: ThreadParams,
    response: PutThreadFavoriteResponseSchema
  }),

  updateAdditionalInformation: defineContract({
    method: 'put',
    path: '/api/document-threads/:messagesThreadId/additional-information',
    tags: ['Document Threads'],
    summary: "Save the thread's CV additional information",
    params: ThreadParams,
    body: z.object({ additionalInformation: z.string() }),
    response: UpdateAdditionalInformationResponseSchema
  }),

  putOriginAuthorConfirmed: defineContract({
    method: 'put',
    path: '/api/document-threads/:messagesThreadId/:studentId/origin-author',
    tags: ['Document Threads'],
    summary: 'Record the student confirming they are the original author',
    params: ThreadStudentParams,
    response: PutOriginAuthorConfirmedResponseSchema
  }),

  /**
   * Declared before `/:messagesThreadId/:studentId` so `forward-documents` is
   * not captured as a student id.
   */
  forwardStudentDocuments: defineContract({
    method: 'post',
    path: '/api/document-threads/:studentId/forward-documents',
    tags: ['Document Threads'],
    summary: "Email a student's documents to staff",
    params: StudentParams,
    response: ForwardStudentDocumentsResponseSchema
  }),

  setThreadStatus: defineContract({
    method: 'put',
    path: '/api/document-threads/:messagesThreadId/:studentId',
    tags: ['Document Threads'],
    summary: 'Set the status of a thread',
    params: ThreadStudentParams,
    response: SetFileFinalResponseSchema
  }),

  postMessage: defineContract({
    method: 'post',
    path: '/api/document-threads/:messagesThreadId/:studentId',
    tags: ['Document Threads'],
    summary: 'Post a message to a thread',
    params: ThreadStudentParams,
    response: SubmitMessageResponseSchema
  }),

  deleteGeneralThread: defineContract({
    method: 'delete',
    path: '/api/document-threads/:messagesThreadId/:studentId',
    tags: ['Document Threads'],
    summary: 'Delete a general document thread',
    params: ThreadStudentParams,
    response: DeleteGeneralFileThreadResponseSchema
  }),

  deleteMessage: defineContract({
    method: 'delete',
    path: '/api/document-threads/delete/:messagesThreadId/:messageId',
    tags: ['Document Threads'],
    summary: 'Delete a message from a thread',
    params: z.object({
      messagesThreadId: z.string().min(1),
      messageId: z.string().min(1)
    }),
    response: DeleteMessageInThreadResponseSchema
  }),

  getMessageImage: defineContract({
    method: 'get',
    path: '/api/document-threads/image/:messagesThreadId/:studentId/:file_name',
    tags: ['Document Threads'],
    summary: 'Download an image posted in a thread',
    params: z.object({
      messagesThreadId: z.string().min(1),
      studentId: z.string().min(1),
      file_name: z.string().min(1)
    }),
    successContentType: 'application/octet-stream',
    response: z.unknown()
  }),

  postImageInThread: defineContract({
    method: 'post',
    path: '/api/document-threads/image/:messagesThreadId/:studentId',
    tags: ['Document Threads'],
    summary: 'Upload an image into a thread',
    params: ThreadStudentParams,
    response: UploadDocumentThreadImageResponseSchema
  }),

  getSurveyInputs: defineContract({
    method: 'get',
    path: '/api/document-threads/:messagesThreadId/survey-inputs',
    tags: ['Document Threads'],
    summary: "Get a thread's survey answers",
    params: ThreadParams,
    response: GetSurveyInputsResponseSchema
  }),

  getMessages: defineContract({
    method: 'get',
    path: '/api/document-threads/:messagesThreadId',
    tags: ['Document Threads'],
    summary: 'Get a thread with its messages',
    params: ThreadParams,
    response: GetMessagesThreadResponseSchema
  }),

  getMessageFile: defineContract({
    method: 'get',
    path: '/api/document-threads/:studentId/:messagesThreadId/:file_key',
    tags: ['Document Threads'],
    summary: 'Download a file attached to a thread message',
    params: z.object({
      studentId: z.string().min(1),
      messagesThreadId: z.string().min(1),
      file_key: z.string().min(1)
    }),
    successContentType: 'application/octet-stream',
    response: z.unknown()
  }),

  deleteProgramThread: defineContract({
    method: 'delete',
    path: '/api/document-threads/:messagesThreadId/:application_id/:studentId',
    tags: ['Document Threads'],
    summary: 'Delete a program-specific document thread',
    params: z.object({
      messagesThreadId: z.string().min(1),
      application_id: z.string().min(1),
      studentId: z.string().min(1)
    }),
    response: DeleteProgramSpecificFileThreadResponseSchema
  })
} as const;
