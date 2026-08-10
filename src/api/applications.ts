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

export const GetActiveStudentsApplicationsResponseSchema =
  createApiResponseSchema(z.array(ApplicationPopulatedSchema));

export const GetStudentApplicationsResponseSchema = createApiResponseSchema(
  StudentResponseSchema
);

export const CreateApplicationResponseSchema = createApiResponseSchema(
  z.array(ApplicationWithIdSchema)
);

export const UpdateStudentApplicationsResponseSchema = createApiResponseSchema(
  StudentResponseSchema
);

export const UpdateApplicationResponseSchema = createApiResponseSchema(
  ApplicationWithIdSchema
);

/**
 * The delete handler answers `{ success, data: { message } }`, not the bare
 * `{ success, message }` this used to declare — the message was in the wrong
 * place, and nothing checked it.
 */
export const DeleteApplicationResponseSchema = createApiResponseSchema(
  z.object({ message: z.string() })
);

/**
 * `GET /api/applications/applications/paginated` — one page of applications
 * plus the unpaginated match count. Rows are the same populated applications
 * the unpaginated reads return; only the envelope differs.
 */
export const GetStudentsApplicationsPaginatedResponseSchema =
  createApiResponseSchema(
    z.object({
      applications: z.array(ApplicationPopulatedSchema),
      total: z.number(),
      page: z.number(),
      limit: z.number()
    })
  );

/**
 * One bar of the "Open Applications Distribution" chart. Computed in the DB, so
 * the endpoint returns the buckets rather than the applications behind them.
 */
export const ApplicationsDeadlineDistributionBucketSchema = z.object({
  /** Deadline label, e.g. "2025/01/15" or "2025-Rolling". */
  name: z.string(),
  /** Decided applications with this deadline. */
  active: z.number(),
  /** Undecided applications with this deadline. */
  potentials: z.number()
});

export const GetApplicationsDeadlineDistributionResponseSchema =
  createApiResponseSchema(z.array(ApplicationsDeadlineDistributionBucketSchema));

/** Aggregated application counts for one TaiGer user's students. */
export const MyStudentsApplicationsStatsSchema = z.object({
  totalStudents: z.number(),
  totalApplications: z.number(),
  decidedYesApplications: z.number(),
  decidedNoApplications: z.number(),
  undecidedApplications: z.number(),
  submittedApplications: z.number(),
  pendingApplications: z.number()
});

export const GetMyStudentsApplicationsStatsResponseSchema =
  createApiResponseSchema(
    z.object({
      // `null` when the id belongs to no user — the endpoint still answers with
      // the stats, so this is not a 404.
      user: UserWithIdSchema.nullable(),
      stats: MyStudentsApplicationsStatsSchema
    })
  );

/** A distinct program row for the "Programs Update Status" tabs. */
export const ApplicationProgramUpdateStatusRowSchema = z.object({
  program_id: z.string(),
  school: z.string(),
  program_name: z.string(),
  degree: z.string(),
  semester: z.string(),
  whoupdated: z.string().optional(),
  updatedAt: z.coerce.date().optional()
});

export const GetApplicationProgramsUpdateStatusResponseSchema =
  createApiResponseSchema(z.array(ApplicationProgramUpdateStatusRowSchema));

export const RefreshApplicationResponseSchema = createApiResponseSchema(
  ApplicationWithIdSchema
);

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

/**
 * GET /api/admissions/overview-aggregates — every dataset the admissions
 * overview page charts, aggregated server-side. Counts over the whole set, so
 * no page of application rows can produce them.
 */
export const AdmissionsOverviewAggregatesSchema = z.object({
  kpis: z.object({
    offer: z.number(),
    rejection: z.number(),
    unknown: z.number(),
    total: z.number(),
    finalCount: z.number()
  }),
  byYear: z.array(
    z.object({
      year: z.string(),
      offer: z.number(),
      rejection: z.number(),
      unknown: z.number(),
      total: z.number()
    })
  ),
  /** One row per student per year, not per application. */
  byStudentYear: z.array(
    z.object({
      year: z.string(),
      offer: z.number(),
      rejected: z.number(),
      pending: z.number(),
      total: z.number()
    })
  ),
  finalByCountry: z.array(z.object({ country: z.string(), count: z.number() })),
  finalByCity: z.array(
    z.object({
      country: z.string(),
      city: z.string(),
      zipCode: z.string(),
      count: z.number()
    })
  )
});

export const GetAdmissionsOverviewAggregatesResponseSchema =
  createApiResponseSchema(AdmissionsOverviewAggregatesSchema);

export const GetApplicationConflictsResponseSchema = createApiResponseSchema(
  z.unknown()
);

/**
 * `GET /api/student-applications/deltas`
 *
 * The program here is the five-field summary the handler destructures, not a
 * whole program document — the row exists to say *which* program a set of
 * student deltas belongs to.
 */
export const GetApplicationTaskDeltasResponseSchema = createApiResponseSchema(
  z.array(
    z.object({
      program: z.object({
        _id: z.string(),
        school: z.string(),
        program_name: z.string(),
        degree: z.string().nullish(),
        semester: z.string().nullish()
      }),
      students: z.array(z.unknown())
    })
  )
);

export const UpdateStudentApplicationResultResponseSchema =
  createApiResponseSchema(ApplicationWithIdSchema);

// =========== Inferred types ===========

/** Per-program count used in admissions response */
export type ProgramCountItem = z.infer<typeof ProgramCountItemSchema>;

/** GET /api/applications */
export type GetApplicationsResponse = z.infer<
  typeof GetApplicationsResponseSchema
>;

/**
 * GET /api/applications/taiger-user/:userId
 * Non-standard: data is an object, not an array
 */
export type GetMyStudentsApplicationsResponse = z.infer<
  typeof GetMyStudentsApplicationsResponseSchema
>;

/** GET /api/applications/applications */
export type GetActiveStudentsApplicationsResponse = z.infer<
  typeof GetActiveStudentsApplicationsResponseSchema
>;

/** GET /api/applications/student/:studentId */
export type GetStudentApplicationsResponse = z.infer<
  typeof GetStudentApplicationsResponseSchema
>;

/** POST /api/applications/student/:studentId */
export type CreateApplicationResponse = z.infer<
  typeof CreateApplicationResponseSchema
>;

/** PUT /api/applications/student/:studentId */
export type UpdateStudentApplicationsResponse = z.infer<
  typeof UpdateStudentApplicationsResponseSchema
>;

/** PUT /api/applications/student/:studentId/:application_id */
export type UpdateApplicationResponse = z.infer<
  typeof UpdateApplicationResponseSchema
>;

/** DELETE /api/applications/application/:applicationId */
export type DeleteApplicationResponse = z.infer<
  typeof DeleteApplicationResponseSchema
>;

/** GET /api/applications/applications/paginated */
export type GetStudentsApplicationsPaginatedResponse = z.infer<
  typeof GetStudentsApplicationsPaginatedResponseSchema
>;

/** One bar of the open-applications deadline chart. */
export type ApplicationsDeadlineDistributionBucket = z.infer<
  typeof ApplicationsDeadlineDistributionBucketSchema
>;

/** GET /api/applications/distribution */
export type GetApplicationsDeadlineDistributionResponse = z.infer<
  typeof GetApplicationsDeadlineDistributionResponseSchema
>;

/** Aggregated application counts for one TaiGer user's students. */
export type MyStudentsApplicationsStats = z.infer<
  typeof MyStudentsApplicationsStatsSchema
>;

/** GET /api/applications/taiger-user/:userId/stats */
export type GetMyStudentsApplicationsStatsResponse = z.infer<
  typeof GetMyStudentsApplicationsStatsResponseSchema
>;

/** A distinct program row for the "Programs Update Status" tabs. */
export type ApplicationProgramUpdateStatusRow = z.infer<
  typeof ApplicationProgramUpdateStatusRowSchema
>;

/** GET /api/applications/program-update-status */
export type GetApplicationProgramsUpdateStatusResponse = z.infer<
  typeof GetApplicationProgramsUpdateStatusResponseSchema
>;

/** POST /api/applications/:applicationId/refresh */
export type RefreshApplicationResponse = z.infer<
  typeof RefreshApplicationResponseSchema
>;

/** Admission result summary from GET /api/admissions/overview */
export type AdmissionsOverviewData = z.infer<
  typeof AdmissionsOverviewDataSchema
>;

/**
 * GET /api/admissions
 * Non-standard: also returns `result` (per-program counts) alongside `data`
 */
export type GetAdmissionsResponse = z.infer<typeof GetAdmissionsResponseSchema>;

/** GET /api/admissions/overview */
export type GetAdmissionsOverviewResponse = z.infer<
  typeof GetAdmissionsOverviewResponseSchema
>;

/** GET /api/admissions/overview-aggregates */
export type AdmissionsOverviewAggregates = z.infer<
  typeof AdmissionsOverviewAggregatesSchema
>;
export type GetAdmissionsOverviewAggregatesResponse = z.infer<
  typeof GetAdmissionsOverviewAggregatesResponseSchema
>;

/** GET /api/student-applications/conflicts */
export type GetApplicationConflictsResponse = z.infer<
  typeof GetApplicationConflictsResponseSchema
>;

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
