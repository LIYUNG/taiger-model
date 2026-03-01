import type { ApiResponse, SuccessResponse } from './common';
import type {
  IInterviewWithId,
  IInterviewSurveyResponseWithId,
  IStudentResponse,
  IAuditWithId
} from './serialized';

/** GET /api/interviews, GET /api/interviews/open */
export type GetInterviewsResponse = ApiResponse<IInterviewWithId[]>;

/**
 * GET /api/interviews/:interview_id
 * Non-standard: also returns interviewAuditLog
 */
export interface GetInterviewResponse {
  success: boolean;
  data?: IInterviewWithId;
  interviewAuditLog?: IAuditWithId[];
}

/**
 * GET /api/interviews/my-interviews
 * Non-standard: returns students or student alongside data
 */
export interface GetMyInterviewsResponse {
  success: boolean;
  data?: IInterviewWithId[];
  students?: IStudentResponse[];
  student?: IStudentResponse;
}

/** GET /api/interviews/interview/:program_id */
export interface GetInterviewsByProgramIdResponse {
  success: boolean;
  data?: IInterviewWithId[];
  count?: number;
}

/** GET /api/interviews/interviews/:student_id */
export interface GetInterviewsByStudentIdResponse {
  success: boolean;
  data?: IInterviewWithId[];
  count?: number;
}

/** GET /api/interviews/:interview_id/survey */
export type GetInterviewSurveyResponse =
  ApiResponse<IInterviewSurveyResponseWithId>;

/** PUT /api/interviews/:interview_id/survey */
export type UpdateInterviewSurveyResponse =
  ApiResponse<IInterviewSurveyResponseWithId>;

/** POST /api/interviews/create/:program_id/:student_id */
export type CreateInterviewResponse = SuccessResponse;

/** DELETE /api/interviews/:interview_id */
export type DeleteInterviewResponse = SuccessResponse;

/** PUT /api/interviews/:interview_id */
export type UpdateInterviewResponse = ApiResponse<IInterviewWithId>;

/** POST /api/interviews/time/:interview_id */
export type AddInterviewTrainingDateTimeResponse = SuccessResponse;
