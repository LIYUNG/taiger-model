import { z } from 'zod';

import {
  GetUserPermissionsResponseSchema,
  UpdateUserPermissionResponseSchema
} from '../api/permissions';
import { PermissionSchema } from '../schema/models';
import { defineContract } from './types';

export const PermissionParamsSchema = z.object({
  user_id: z.string().min(1)
});

/**
 * The writable permission flags.
 *
 * Everything else is **stripped, not rejected**. The client reads the whole
 * permission document, toggles one flag and posts it back — so the body arrives
 * carrying `_id`, `__v`, `createdAt`, `updatedAt` and `user_id`. Rejecting those
 * would break a legitimate read-modify-write; dropping them gets the property
 * that matters, which is that only the flags reach the upsert.
 *
 * `user_id` in particular is ignored rather than honoured: which user is being
 * modified is decided by the path, and this endpoint grants privileges.
 */
export const UpdatePermissionBodySchema = PermissionSchema.omit({
  user_id: true,
  updatedAt: true
});

export const permissionsContract = {
  getUserPermission: defineContract({
    method: 'get',
    path: '/api/permissions/:user_id',
    tags: ['Permissions'],
    summary: 'Get permissions',
    params: PermissionParamsSchema,
    response: GetUserPermissionsResponseSchema
  }),

  updateUserPermission: defineContract({
    method: 'post',
    path: '/api/permissions/:user_id',
    tags: ['Permissions'],
    summary: 'Create or update a user permissions',
    params: PermissionParamsSchema,
    body: UpdatePermissionBodySchema,
    response: UpdateUserPermissionResponseSchema
  })
} as const;
