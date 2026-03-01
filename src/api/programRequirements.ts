import type { ApiResponse, SuccessResponse } from './common';
import type {
  IProgramrequirementWithId,
  IProgramWithId,
  IKeywordsetWithId
} from './serialized';

/** Payload returned by GET /api/program-requirements/programs-and-keywords */
export interface ProgramsAndKeywordsData {
  distinctPrograms?: IProgramWithId[];
  keywordsets?: IKeywordsetWithId[];
}

/** GET /api/program-requirements */
export type GetProgramRequirementsResponse =
  ApiResponse<IProgramrequirementWithId[]>;

/**
 * GET /api/program-requirements/:programRequirementId
 * Non-standard: data wraps requirement + supporting lists
 */
export interface GetProgramRequirementResponse {
  success: boolean;
  data?: {
    requirement: IProgramrequirementWithId;
    distinctPrograms?: IProgramWithId[];
    keywordsets?: IKeywordsetWithId[];
  };
}

/** GET /api/program-requirements/programs-and-keywords */
export type GetProgramsAndKeywordSetsResponse =
  ApiResponse<ProgramsAndKeywordsData>;

/** POST /api/program-requirements/new */
export type CreateProgramRequirementResponse =
  ApiResponse<IProgramrequirementWithId>;

/** PUT /api/program-requirements/:programRequirementId */
export type UpdateProgramRequirementResponse =
  ApiResponse<IProgramrequirementWithId>;

/** DELETE /api/program-requirements/:programRequirementId */
export type DeleteProgramRequirementResponse = SuccessResponse;
