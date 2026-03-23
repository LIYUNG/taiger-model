import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import { UserWithIdSchema } from './serialized';

// =========== Schemas ===========

export const UsersCountDataSchema = z.object({
  totalUsers: z.number().optional(),
  studentCount: z.number().optional(),
  agentCount: z.number().optional(),
  editorCount: z.number().optional(),
  externalCount: z.number().optional(),
  adminCount: z.number().optional(),
  guestCount: z.number().optional()
});

export const GetUsersCountResponseSchema = UsersCountDataSchema.extend({
  success: z.boolean().optional()
}).catchall(z.unknown());

export const UsersOverviewMetricItemSchema = z
  .object({ count: z.number() })
  .catchall(z.unknown());

export const UsersOverviewDataSchema = z.object({
  byTargetDegree: z.array(UsersOverviewMetricItemSchema).optional(),
  byApplicationSemester: z.array(UsersOverviewMetricItemSchema).optional(),
  byTargetField: z.array(UsersOverviewMetricItemSchema).optional(),
  byProgramLanguage: z.array(UsersOverviewMetricItemSchema).optional(),
  byUniversity: z.array(UsersOverviewMetricItemSchema).optional(),
  generatedAt: z.coerce.date().optional()
});

export const GetUsersOverviewResponseSchema = createApiResponseSchema(UsersOverviewDataSchema);

export const GetUsersResponseSchema = createApiResponseSchema(z.array(UserWithIdSchema));

export const GetUserResponseSchema = createApiResponseSchema(UserWithIdSchema);

export const AddUserResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(UserWithIdSchema),
  newUser: z.string()
});

export const UpdateUserResponseSchema = createApiResponseSchema(UserWithIdSchema);

export const DeleteUserResponseSchema = SuccessResponseSchema;

export const UpdateArchivUserResponseSchema = createApiResponseSchema(z.array(UserWithIdSchema));

export const GetEssayWritersResponseSchema = createApiResponseSchema(z.array(UserWithIdSchema));

// =========== Inferred types ===========

/** Shape of the users count summary returned by GET /api/users/count */
export type UsersCountData = z.infer<typeof UsersCountDataSchema>;

/** GET /api/users/count */
export type GetUsersCountResponse = z.infer<typeof GetUsersCountResponseSchema>;

/** A single metric breakdown item (e.g. by degree, by language) */
export type UsersOverviewMetricItem = z.infer<typeof UsersOverviewMetricItemSchema>;

/** Shape of data returned by GET /api/users/overview */
export type UsersOverviewData = z.infer<typeof UsersOverviewDataSchema>;

/** GET /api/users/overview */
export type GetUsersOverviewResponse = z.infer<typeof GetUsersOverviewResponseSchema>;

/** GET /api/users */
export type GetUsersResponse = z.infer<typeof GetUsersResponseSchema>;

/** GET /api/users/:user_id */
export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;

/** POST /api/users (add user) — returns full user list + new user id */
export type AddUserResponse = z.infer<typeof AddUserResponseSchema>;

/** POST /api/users/:id (update user) */
export type UpdateUserResponse = z.infer<typeof UpdateUserResponseSchema>;

/** DELETE /api/users/:id */
export type DeleteUserResponse = z.infer<typeof DeleteUserResponseSchema>;

/** POST /api/users/archiv/:user_id */
export type UpdateArchivUserResponse = z.infer<typeof UpdateArchivUserResponseSchema>;

/** GET /api/essay-writers */
export type GetEssayWritersResponse = z.infer<typeof GetEssayWritersResponseSchema>;
