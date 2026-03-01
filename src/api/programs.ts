import type { ApiResponse, SuccessResponse } from './common';
import type { IProgramWithId, IStudentResponse } from './serialized';

/** { school, country, city, programCount } */
export interface SchoolDistributionItem {
  school?: string;
  country?: string;
  city?: string;
  programCount?: number;
}

/** School attribute item from GET /api/programs/schools */
export interface SchoolAttributeItem {
  school?: string;
  isPrivateSchool?: boolean;
  isPartnerSchool?: boolean;
  schoolType?: string;
  country?: string;
  tags?: string[];
  count?: number;
}

/** Top-applying program in the programs overview */
export interface TopApplicationProgram {
  programId?: string;
  school?: string;
  program_name?: string;
  degree?: string;
  semester?: string;
  country?: string;
  totalApplications?: number;
  submittedCount?: number;
  admittedCount?: number;
  rejectedCount?: number;
  pendingCount?: number;
  admissionRate?: number;
}

/** Recently updated program entry */
export interface RecentlyUpdatedProgram {
  school?: string;
  program_name?: string;
  degree?: string;
  semester?: string;
  updatedAt?: Date | string;
  whoupdated?: string;
}

/** Full programs overview payload */
export interface ProgramsOverviewData {
  totalPrograms?: number;
  totalSchools?: number;
  byCountry?: Array<{ country?: string; count?: number }>;
  byDegree?: Array<{ degree?: string; count?: number }>;
  byLanguage?: Array<{ language?: string; count?: number }>;
  bySubject?: Array<{ subject?: string; count?: number }>;
  bySchoolType?: Array<{
    schoolType?: string;
    isPrivateSchool?: boolean;
    isPartnerSchool?: boolean;
    count?: number;
  }>;
  topSchools?: SchoolDistributionItem[];
  topContributors?: Array<{
    contributor?: string;
    updateCount?: number;
    lastUpdate?: Date | string;
  }>;
  recentlyUpdated?: RecentlyUpdatedProgram[];
  topApplicationPrograms?: TopApplicationProgram[];
  generatedAt?: Date;
}

/** GET /api/programs */
export type GetProgramsResponse = ApiResponse<IProgramWithId[]>;

/** GET /api/programs/overview */
export type GetProgramsOverviewResponse = ApiResponse<ProgramsOverviewData>;

/**
 * GET /api/programs/:programId
 * Non-standard: has extra top-level fields beyond `data`
 */
export interface GetProgramResponse {
  success: boolean;
  data: IProgramWithId;
  students?: IStudentResponse[];
  vc?: unknown[];
}

/** POST /api/programs */
export type CreateProgramResponse = ApiResponse<IProgramWithId>;

/**
 * PUT /api/programs/:id
 * Non-standard: also returns vc (version control)
 */
export interface UpdateProgramResponse {
  success: boolean;
  data?: IProgramWithId;
  vc?: unknown[];
}

/** DELETE /api/programs/:program_id */
export type DeleteProgramResponse = SuccessResponse;

/** GET /api/programs/schools-distribution */
export type GetSchoolsDistributionResponse =
  ApiResponse<SchoolDistributionItem[]>;

/** GET /api/programs/schools */
export type GetDistinctSchoolsResponse = ApiResponse<SchoolAttributeItem[]>;

/** PUT /api/programs/schools */
export type UpdateSchoolAttributesResponse = SuccessResponse;

/** GET /api/programs/same-program-students/:programId */
export type GetSameProgramStudentsResponse = ApiResponse<IStudentResponse[]>;

/** GET /api/programs/:programId/change-requests */
export type GetProgramChangeRequestsResponse = ApiResponse<unknown[]>;

/** POST /api/programs/review-changes/:requestId */
export type ReviewProgramChangeRequestsResponse = SuccessResponse;

/**
 * POST /api/programs/:programId/refresh
 * Same shape as UpdateProgramResponse
 */
export type RefreshProgramResponse = UpdateProgramResponse;
