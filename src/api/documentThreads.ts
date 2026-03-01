import type { ApiResponse, SuccessResponse } from './common';
import type {
  IDocumentthreadWithId,
  ISurveyInputWithId,
  IUserWithId,
  IAuditWithId
} from './serialized';

/** Favorite toggle result */
export interface ThreadFavoriteData {
  isFlagged: boolean;
}

/**
 * GET /api/document-threads/:documentsthreadId
 * Non-standard: returns multiple top-level fields
 */
export interface GetMessagesThreadResponse {
  success: boolean;
  data?: IDocumentthreadWithId;
  similarThreads?: IDocumentthreadWithId[];
  agents?: IUserWithId[];
  editors?: IUserWithId[];
  threadAuditLog?: IAuditWithId[];
  deadline?: unknown;
  conflict_list?: unknown[];
}

/** GET /api/document-threads/overview/all */
export type GetActiveThreadsResponse = ApiResponse<IDocumentthreadWithId[]>;

/** GET /api/document-threads/student-threads/:studentId */
export type GetThreadsByStudentResponse = ApiResponse<IDocumentthreadWithId[]>;

/**
 * GET /api/document-threads/overview/taiger-user/:userId
 * Non-standard: data is an object with threads + user
 */
export type GetMyStudentThreadsResponse = ApiResponse<{
  threads: IDocumentthreadWithId[];
  user: IUserWithId;
}>;

/** GET /api/document-threads/overview/my-student-metrics */
export type GetMyStudentThreadMetricsResponse = ApiResponse<unknown>;

/** PUT /api/document-threads/:documentsthreadId/favorite */
export type PutThreadFavoriteResponse = ApiResponse<ThreadFavoriteData>;

/** PUT /api/document-threads/:documentsthreadId/:studentId (set as final) */
export type SetFileFinalResponse = ApiResponse<IDocumentthreadWithId>;

/** POST /api/document-threads/init/general/:studentId/:document_catgory */
export type InitGeneralThreadResponse = ApiResponse<IDocumentthreadWithId>;

/** POST /api/document-threads/init/application/:studentId/:applicationId/:document_catgory */
export type InitApplicationThreadResponse = ApiResponse<IDocumentthreadWithId>;

/** POST /api/document-threads/:documentsthreadId/:studentId (submit message) */
export type SubmitMessageResponse = ApiResponse<IDocumentthreadWithId>;

/** DELETE /api/document-threads/:documentsthreadId/:studentId */
export type DeleteGeneralFileThreadResponse = SuccessResponse;

/** DELETE /api/document-threads/:documentsthreadId/:application_id/:studentId */
export type DeleteProgramSpecificFileThreadResponse = SuccessResponse;

/** DELETE /api/document-threads/delete/:documentsthreadId/:messageId */
export type DeleteMessageInThreadResponse = SuccessResponse;

/** POST /api/document-threads/:documentsthreadId/essay */
export type UpdateEssayWriterResponse = ApiResponse<IDocumentthreadWithId>;

/** POST /api/document-threads/image/:documentsthreadId/:studentId */
export type UploadDocumentThreadImageResponse =
  ApiResponse<IDocumentthreadWithId>;

/** PUT /api/document-threads/:documentsthreadId/:studentId/origin-author */
export type PutOriginAuthorConfirmedResponse =
  ApiResponse<IDocumentthreadWithId>;

/** PUT /api/document-threads/:documentThreadId/:documentsthreadMessageId/:ignoreMessageState/ignored */
export type IgnoreMessageThreadResponse = ApiResponse<IDocumentthreadWithId>;

/** GET /api/document-threads/pattern/check/:thread_id/:file_type */
export type GetCheckDocumentPatternResponse = ApiResponse<unknown>;

/** GET /api/document-threads/:documentsthreadId/survey-inputs */
export type GetSurveyInputsResponse = ApiResponse<ISurveyInputWithId>;

/** POST /api/document-threads/survey-input/ */
export type PostSurveyInputResponse = ApiResponse<ISurveyInputWithId>;

/** PUT /api/document-threads/survey-input/:surveyId */
export type PutSurveyInputResponse = ApiResponse<ISurveyInputWithId>;

/** DELETE /api/document-threads/survey-input/:surveyId */
export type DeleteSurveyInputResponse = SuccessResponse;
