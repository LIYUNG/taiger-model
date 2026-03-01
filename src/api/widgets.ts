import type { ApiResponse, SuccessResponse } from './common';
import type { ICourseAnalysis } from '../model/Course';

/** POST /api/widgets/transcript/engine/v2/:language — returns analysis metadata */
export type WidgetTranscriptResponse = ApiResponse<ICourseAnalysis>;

/**
 * GET /api/widgets/transcript/v2/:adminId
 * Non-standard: returns json payload + fileKey alongside success
 */
export interface WidgetDownloadJsonResponse {
  success: boolean;
  json?: unknown;
  fileKey?: string;
}

/** GET /api/widgets/messages/export/:student_id — returns PDF blob (non-JSON) */
export type WidgetExportPDFResponse = SuccessResponse;

/** POST /api/taigerai/general — streaming or standard AI response */
export type TaigerAiResponse = ApiResponse<string>;

/** GET /api/taigerai/program/:programId */
export type ProcessProgramListResponse = SuccessResponse;

/** POST /api/taigerai/cvmlrl */
export type CvmlrlAiResponse = ApiResponse<string>;

/** POST /api/taigerai/chat/:studentId */
export type TaigerChatAssistantResponse = ApiResponse<string>;

/** POST /api/courses/transcript/v2/:studentId/:language */
export type TranscriptAnalyserResponse = ApiResponse<ICourseAnalysis>;

/** GET /api/courses/transcript/v2/:user_id */
export type AnalyzedFileDownloadResponse = WidgetDownloadJsonResponse;

/** GET /api/expenses/users/:taiger_user_id */
export type GetExpenseResponse = ApiResponse<unknown>;
