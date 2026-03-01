import type { ApiResponse } from './common';
import type { IPermissionWithId } from './serialized';

/** GET /api/permissions (all permissions) */
export type GetUserPermissionsResponse = ApiResponse<IPermissionWithId[]>;

/** POST /api/permissions/:taiger_user_id */
export type UpdateUserPermissionResponse = ApiResponse<IPermissionWithId>;
