import { z } from 'zod';
import { createApiResponseSchema } from './common';
import { PermissionWithIdSchema } from './serialized';

// =========== Schemas ===========

/**
 * The user a permission row belongs to, as the endpoints return it.
 *
 * `PermissionSchema.user_id` is an id string — accurate for the stored
 * document. Both permission endpoints populate it with
 * `select('firstname lastname email')`, so the response carries this object.
 */
export const PermissionUserRefSchema = z.object({
  _id: z.string(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().optional()
});

/** A permission row with its user resolved. */
export const PermissionPopulatedSchema = PermissionWithIdSchema.extend({
  user_id: PermissionUserRefSchema.optional()
});

export const GetUserPermissionsResponseSchema = createApiResponseSchema(
  z.array(PermissionPopulatedSchema)
);

export const UpdateUserPermissionResponseSchema = createApiResponseSchema(
  PermissionPopulatedSchema
);

// =========== Inferred types ===========

export type PermissionUserRef = z.infer<typeof PermissionUserRefSchema>;
export type PermissionPopulated = z.infer<typeof PermissionPopulatedSchema>;

/** GET /api/permissions/:user_id */
export type GetUserPermissionsResponse = z.infer<typeof GetUserPermissionsResponseSchema>;

/** POST /api/permissions/:user_id */
export type UpdateUserPermissionResponse = z.infer<typeof UpdateUserPermissionResponseSchema>;
