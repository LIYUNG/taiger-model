import type { ApiResponse, SuccessResponse } from './common';
import type {
  IStudentResponse,
  IUserAcademicBackgroundUniversity,
  IUserAcademicBackgroundLanguage,
  IUserApplicationPreference
} from './serialized';

/** POST /api/account/credentials */
export type UpdateCredentialsResponse = SuccessResponse;

/** POST /api/account/student/notifications */
export type UpdateBannerResponse = SuccessResponse;

/** POST /api/account/agent/notifications */
export type UpdateAgentBannerResponse = SuccessResponse;

/** Personal data subset returned after profile update */
export interface PersonalDataSubset {
  firstname?: string;
  firstname_chinese?: string;
  lastname?: string;
  lastname_chinese?: string;
  birthday?: string;
  linkedIn?: string;
  lineId?: string;
}

/** POST /api/account/profile/:user_id */
export type UpdatePersonalDataResponse = ApiResponse<PersonalDataSubset>;

/**
 * POST /api/account/survey/university/:student_id
 * Non-standard: returns data (university obj) + profile side-effect
 */
export interface UpdateAcademicBackgroundResponse {
  success: boolean;
  data?: IUserAcademicBackgroundUniversity;
  profile?: unknown;
}

/**
 * POST /api/account/survey/language/:student_id
 * Non-standard: returns data (language obj) + profile side-effect
 */
export interface UpdateLanguageSkillResponse {
  success: boolean;
  data?: IUserAcademicBackgroundLanguage;
  profile?: unknown;
}

/** POST /api/account/survey/preferences/:student_id */
export type UpdateApplicationPreferenceResponse =
  ApiResponse<IUserApplicationPreference>;

/** GET /api/account/survey */
export type GetMyAcademicBackgroundResponse = ApiResponse<IStudentResponse>;

// --- Templates ---

/** GET /api/account/files/template */
export type GetTemplatesResponse = ApiResponse<unknown[]>;

/** POST /api/account/files/template/:category */
export type UploadTemplateResponse = SuccessResponse;

/** DELETE /api/account/files/template/:category */
export type DeleteTemplateFileResponse = SuccessResponse;
