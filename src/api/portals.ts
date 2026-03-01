import type { ApiResponse } from './common';
import type { IApplicationWithId } from './serialized';

/** Student summary shape nested inside portal credentials response */
export interface PortalCredentialsStudent {
  _id?: string;
  firstname?: string;
  lastname?: string;
  agents?: unknown[];
  editors?: unknown[];
}

/**
 * GET /api/portal-informations/:student_id
 * Non-standard: data is an object, not a single document
 */
export interface GetPortalCredentialsResponse {
  success: boolean;
  data?: {
    applications: IApplicationWithId[];
    student: PortalCredentialsStudent;
  };
}

/** POST /api/portal-informations/:student_id/:applicationId */
export type CreatePortalCredentialsResponse = ApiResponse<IApplicationWithId>;
