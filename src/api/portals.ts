import { z } from 'zod';
import { createApiResponseSchema } from './common';
import { ApplicationWithIdSchema } from './serialized';

// =========== Schemas ===========

export const PortalCredentialsStudentSchema = z.object({
  _id: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  agents: z.array(z.unknown()).optional(),
  editors: z.array(z.unknown()).optional()
});

export const GetPortalCredentialsResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      applications: z.array(ApplicationWithIdSchema),
      student: PortalCredentialsStudentSchema
    })
    .optional()
});

export const CreatePortalCredentialsResponseSchema = createApiResponseSchema(
  ApplicationWithIdSchema
);

// =========== Inferred types ===========

/** Student summary shape nested inside portal credentials response */
export type PortalCredentialsStudent = z.infer<typeof PortalCredentialsStudentSchema>;

/**
 * GET /api/portal-informations/:student_id
 * Non-standard: data is an object, not a single document
 */
export type GetPortalCredentialsResponse = z.infer<typeof GetPortalCredentialsResponseSchema>;

/** POST /api/portal-informations/:student_id/:applicationId */
export type CreatePortalCredentialsResponse = z.infer<typeof CreatePortalCredentialsResponseSchema>;
