import type { ApiResponse, SuccessResponse } from './common';
import type { IUserWithId } from './serialized';

/** Shape of the users count summary returned by GET /api/users/count */
export interface UsersCountData {
  totalUsers?: number;
  studentCount?: number;
  agentCount?: number;
  editorCount?: number;
  externalCount?: number;
  adminCount?: number;
  guestCount?: number;
}

/** GET /api/users/count */
export interface GetUsersCountResponse extends UsersCountData {
  success?: boolean;
  [key: string]: unknown;
}

/** A single metric breakdown item (e.g. by degree, by language) */
export interface UsersOverviewMetricItem {
  count: number;
  [key: string]: unknown;
}

/** Shape of data returned by GET /api/users/overview */
export interface UsersOverviewData {
  byTargetDegree?: UsersOverviewMetricItem[];
  byApplicationSemester?: UsersOverviewMetricItem[];
  byTargetField?: UsersOverviewMetricItem[];
  byProgramLanguage?: UsersOverviewMetricItem[];
  byUniversity?: UsersOverviewMetricItem[];
  generatedAt?: Date;
}

/** GET /api/users/overview */
export type GetUsersOverviewResponse = ApiResponse<UsersOverviewData>;

/** GET /api/users */
export type GetUsersResponse = ApiResponse<IUserWithId[]>;

/** GET /api/users/:user_id */
export type GetUserResponse = ApiResponse<IUserWithId>;

/** POST /api/users (add user) — returns full user list + new user id */
export interface AddUserResponse {
  success: boolean;
  data: IUserWithId[];
  newUser: string;
}

/** POST /api/users/:id (update user) */
export type UpdateUserResponse = ApiResponse<IUserWithId>;

/** DELETE /api/users/:id */
export type DeleteUserResponse = SuccessResponse;

/** POST /api/users/archiv/:user_id */
export type UpdateArchivUserResponse = ApiResponse<IUserWithId[]>;

/** GET /api/essay-writers */
export type GetEssayWritersResponse = ApiResponse<IUserWithId[]>;
