import { z } from 'zod';
import { createApiResponseSchema } from './common';
import { PermissionWithIdSchema } from './serialized';

// =========== Schemas ===========

export const GetUserPermissionsResponseSchema = createApiResponseSchema(
  z.array(PermissionWithIdSchema)
);

export const UpdateUserPermissionResponseSchema = createApiResponseSchema(PermissionWithIdSchema);

// =========== Inferred types ===========

/** GET /api/permissions (all permissions) */
export type GetUserPermissionsResponse = z.infer<typeof GetUserPermissionsResponseSchema>;

/** POST /api/permissions/:taiger_user_id */
export type UpdateUserPermissionResponse = z.infer<typeof UpdateUserPermissionResponseSchema>;
