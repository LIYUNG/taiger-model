import type { ApiResponse, SuccessResponse } from './common';
import type {
  IApplicationWithId,
  IStudentResponse,
  IUserWithId,
  IProgramWithId
} from './serialized';

/** Per-program count used in admissions response */
export interface ProgramCountItem {
  program_id?: string;
  count?: number;
}

/** GET /api/applications */
export type GetApplicationsResponse = ApiResponse<IApplicationWithId[]>;

/**
 * GET /api/applications/taiger-user/:userId
 * Non-standard: data is an object, not an array
 */
export interface GetMyStudentsApplicationsResponse {
  success: boolean;
  data?: {
    applications: IApplicationWithId[];
    user: IUserWithId;
  };
}

/** GET /api/applications/all/active/applications */
export type GetActiveStudentsApplicationsResponse =
  ApiResponse<IApplicationWithId[]>;

/** GET /api/applications/student/:studentId */
export type GetStudentApplicationsResponse = ApiResponse<IStudentResponse>;

/** POST /api/applications/student/:studentId */
export type CreateApplicationResponse = ApiResponse<IApplicationWithId[]>;

/** PUT /api/applications/student/:studentId */
export type UpdateStudentApplicationsResponse = ApiResponse<IStudentResponse>;

/** PUT /api/applications/student/:studentId/:application_id */
export type UpdateApplicationResponse = ApiResponse<IApplicationWithId>;

/** DELETE /api/applications/application/:applicationId */
export type DeleteApplicationResponse = SuccessResponse;

/** POST /api/applications/:applicationId/refresh */
export type RefreshApplicationResponse = ApiResponse<IApplicationWithId>;

/** Admission result summary from GET /api/admissions/overview */
export interface AdmissionsOverviewData {
  admission?: number;
  rejection?: number;
  pending?: number;
  notYetSubmitted?: number;
}

/**
 * GET /api/admissions
 * Non-standard: also returns `result` (per-program counts) alongside `data`
 */
export interface GetAdmissionsResponse {
  success: boolean;
  data?: IApplicationWithId[];
  result?: ProgramCountItem[];
}

/** GET /api/admissions/overview */
export type GetAdmissionsOverviewResponse =
  ApiResponse<AdmissionsOverviewData>;

/** GET /api/student-applications/conflicts */
export type GetApplicationConflictsResponse = ApiResponse<unknown>;

/**
 * GET /api/student-applications/deltas
 * Returns per-program student delta arrays
 */
export type GetApplicationTaskDeltasResponse = ApiResponse<
  Array<{ program: IProgramWithId; students: unknown[] }>
>;

/** POST /api/account/applications/result/:studentId/:applicationId/:programId/:result */
export type UpdateStudentApplicationResultResponse = ApiResponse<IApplicationWithId>;
