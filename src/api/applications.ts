import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import {
  ApplicationWithIdSchema,
  ApplicationPopulatedSchema,
  StudentResponseSchema,
  UserWithIdSchema,
  ProgramWithIdSchema
} from './serialized';

// =========== Schemas ===========

export const ProgramCountItemSchema = z.object({
  program_id: z.string().optional(),
  count: z.number().optional()
});

export const GetApplicationsResponseSchema = createApiResponseSchema(
  z.array(ApplicationPopulatedSchema)
);

export const GetMyStudentsApplicationsResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      applications: z.array(ApplicationPopulatedSchema),
      user: UserWithIdSchema
    })
    .optional()
});

export const GetActiveStudentsApplicationsResponseSchema = createApiResponseSchema(
  z.array(ApplicationPopulatedSchema)
);

export const GetStudentApplicationsResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const CreateApplicationResponseSchema = createApiResponseSchema(
  z.array(ApplicationWithIdSchema)
);

export const UpdateStudentApplicationsResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const UpdateApplicationResponseSchema = createApiResponseSchema(ApplicationWithIdSchema);

export const DeleteApplicationResponseSchema = SuccessResponseSchema;

export const RefreshApplicationResponseSchema = createApiResponseSchema(ApplicationWithIdSchema);

export const AdmissionsOverviewDataSchema = z.object({
  admission: z.number().optional(),
  rejection: z.number().optional(),
  pending: z.number().optional(),
  notYetSubmitted: z.number().optional()
});

export const GetAdmissionsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(ApplicationPopulatedSchema).optional(),
  result: z.array(ProgramCountItemSchema).optional()
});

export const GetAdmissionsOverviewResponseSchema = createApiResponseSchema(
  AdmissionsOverviewDataSchema
);

export const GetApplicationConflictsResponseSchema = createApiResponseSchema(z.unknown());

export const GetApplicationTaskDeltasResponseSchema = createApiResponseSchema(
  z.array(
    z.object({
      program: ProgramWithIdSchema,
      students: z.array(z.unknown())
    })
  )
);

export const UpdateStudentApplicationResultResponseSchema = createApiResponseSchema(
  ApplicationWithIdSchema
);

// =========== Inferred types ===========

/** Per-program count used in admissions response */
export type ProgramCountItem = z.infer<typeof ProgramCountItemSchema>;

/** GET /api/applications */
export type GetApplicationsResponse = z.infer<typeof GetApplicationsResponseSchema>;

/**
 * GET /api/applications/taiger-user/:userId
 * Non-standard: data is an object, not an array
 */
export type GetMyStudentsApplicationsResponse = z.infer<
  typeof GetMyStudentsApplicationsResponseSchema
>;

/** GET /api/applications/all/active/applications */
export type GetActiveStudentsApplicationsResponse = z.infer<
  typeof GetActiveStudentsApplicationsResponseSchema
>;

/** GET /api/applications/student/:studentId */
export type GetStudentApplicationsResponse = z.infer<typeof GetStudentApplicationsResponseSchema>;

/** POST /api/applications/student/:studentId */
export type CreateApplicationResponse = z.infer<typeof CreateApplicationResponseSchema>;

/** PUT /api/applications/student/:studentId */
export type UpdateStudentApplicationsResponse = z.infer<
  typeof UpdateStudentApplicationsResponseSchema
>;

/** PUT /api/applications/student/:studentId/:application_id */
export type UpdateApplicationResponse = z.infer<typeof UpdateApplicationResponseSchema>;

/** DELETE /api/applications/application/:applicationId */
export type DeleteApplicationResponse = z.infer<typeof DeleteApplicationResponseSchema>;

/** POST /api/applications/:applicationId/refresh */
export type RefreshApplicationResponse = z.infer<typeof RefreshApplicationResponseSchema>;

/** Admission result summary from GET /api/admissions/overview */
export type AdmissionsOverviewData = z.infer<typeof AdmissionsOverviewDataSchema>;

/**
 * GET /api/admissions
 * Non-standard: also returns `result` (per-program counts) alongside `data`
 */
export type GetAdmissionsResponse = z.infer<typeof GetAdmissionsResponseSchema>;

/** GET /api/admissions/overview */
export type GetAdmissionsOverviewResponse = z.infer<typeof GetAdmissionsOverviewResponseSchema>;

/** GET /api/student-applications/conflicts */
export type GetApplicationConflictsResponse = z.infer<typeof GetApplicationConflictsResponseSchema>;

/**
 * GET /api/student-applications/deltas
 * Returns per-program student delta arrays
 */
export type GetApplicationTaskDeltasResponse = z.infer<
  typeof GetApplicationTaskDeltasResponseSchema
>;

/** POST /api/account/applications/result/:studentId/:applicationId/:programId/:result */
export type UpdateStudentApplicationResultResponse = z.infer<
  typeof UpdateStudentApplicationResultResponseSchema
>;
