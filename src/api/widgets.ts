import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import { CourseAnalysisSchema } from '../schema/models';

// =========== Schemas ===========

export const WidgetTranscriptResponseSchema = createApiResponseSchema(CourseAnalysisSchema);

export const WidgetDownloadJsonResponseSchema = z.object({
  success: z.boolean(),
  json: z.unknown().optional(),
  fileKey: z.string().optional()
});

export const WidgetExportPDFResponseSchema = SuccessResponseSchema;

export const TaigerAiResponseSchema = createApiResponseSchema(z.string());

export const ProcessProgramListResponseSchema = SuccessResponseSchema;

export const CvmlrlAiResponseSchema = createApiResponseSchema(z.string());

export const TaigerChatAssistantResponseSchema = createApiResponseSchema(z.string());

export const TranscriptAnalyserResponseSchema = createApiResponseSchema(CourseAnalysisSchema);

export const AnalyzedFileDownloadResponseSchema = WidgetDownloadJsonResponseSchema;

export const GetExpenseResponseSchema = createApiResponseSchema(z.unknown());

// =========== Inferred types ===========

/** POST /api/widgets/transcript/engine/v2/:language — returns analysis metadata */
export type WidgetTranscriptResponse = z.infer<typeof WidgetTranscriptResponseSchema>;

/**
 * GET /api/widgets/transcript/v2/:adminId
 * Non-standard: returns json payload + fileKey alongside success
 */
export type WidgetDownloadJsonResponse = z.infer<typeof WidgetDownloadJsonResponseSchema>;

/** GET /api/widgets/messages/export/:student_id — returns PDF blob (non-JSON) */
export type WidgetExportPDFResponse = z.infer<typeof WidgetExportPDFResponseSchema>;

/** POST /api/taigerai/general — streaming or standard AI response */
export type TaigerAiResponse = z.infer<typeof TaigerAiResponseSchema>;

/** GET /api/taigerai/program/:programId */
export type ProcessProgramListResponse = z.infer<typeof ProcessProgramListResponseSchema>;

/** POST /api/taigerai/cvmlrl */
export type CvmlrlAiResponse = z.infer<typeof CvmlrlAiResponseSchema>;

/** POST /api/taigerai/chat/:studentId */
export type TaigerChatAssistantResponse = z.infer<typeof TaigerChatAssistantResponseSchema>;

/** POST /api/courses/transcript/v2/:studentId/:language */
export type TranscriptAnalyserResponse = z.infer<typeof TranscriptAnalyserResponseSchema>;

/** GET /api/courses/transcript/v2/:user_id */
export type AnalyzedFileDownloadResponse = z.infer<typeof AnalyzedFileDownloadResponseSchema>;

/** GET /api/expenses/users/:taiger_user_id */
export type GetExpenseResponse = z.infer<typeof GetExpenseResponseSchema>;
