import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import { ProgramWithIdSchema, StudentResponseSchema } from './serialized';

// =========== Schemas ===========

export const SchoolDistributionItemSchema = z.object({
  school: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  programCount: z.number().optional()
});

export const SchoolAttributeItemSchema = z.object({
  school: z.string().optional(),
  isPrivateSchool: z.boolean().optional(),
  isPartnerSchool: z.boolean().optional(),
  schoolType: z.string().optional(),
  country: z.string().optional(),
  tags: z.array(z.string()).optional(),
  count: z.number().optional()
});

export const TopApplicationProgramSchema = z.object({
  programId: z.string().optional(),
  school: z.string().optional(),
  program_name: z.string().optional(),
  degree: z.string().optional(),
  semester: z.string().optional(),
  country: z.string().optional(),
  totalApplications: z.number().optional(),
  submittedCount: z.number().optional(),
  admittedCount: z.number().optional(),
  rejectedCount: z.number().optional(),
  pendingCount: z.number().optional(),
  admissionRate: z.number().optional()
});

export const RecentlyUpdatedProgramSchema = z.object({
  school: z.string().optional(),
  program_name: z.string().optional(),
  degree: z.string().optional(),
  semester: z.string().optional(),
  updatedAt: z.union([z.coerce.date(), z.string()]).optional(),
  whoupdated: z.string().optional()
});

export const ProgramsOverviewDataSchema = z.object({
  totalPrograms: z.number().optional(),
  totalSchools: z.number().optional(),
  byCountry: z.array(z.object({ country: z.string().optional(), count: z.number().optional() })).optional(),
  byDegree: z.array(z.object({ degree: z.string().optional(), count: z.number().optional() })).optional(),
  byLanguage: z.array(z.object({ language: z.string().optional(), count: z.number().optional() })).optional(),
  bySubject: z.array(z.object({ subject: z.string().optional(), count: z.number().optional() })).optional(),
  bySchoolType: z
    .array(
      z.object({
        schoolType: z.string().optional(),
        isPrivateSchool: z.boolean().optional(),
        isPartnerSchool: z.boolean().optional(),
        count: z.number().optional()
      })
    )
    .optional(),
  topSchools: z.array(SchoolDistributionItemSchema).optional(),
  topContributors: z
    .array(
      z.object({
        contributor: z.string().optional(),
        updateCount: z.number().optional(),
        lastUpdate: z.union([z.coerce.date(), z.string()]).optional()
      })
    )
    .optional(),
  recentlyUpdated: z.array(RecentlyUpdatedProgramSchema).optional(),
  topApplicationPrograms: z.array(TopApplicationProgramSchema).optional(),
  generatedAt: z.coerce.date().optional()
});

export const GetProgramsResponseSchema = createApiResponseSchema(z.array(ProgramWithIdSchema));

export const GetProgramsOverviewResponseSchema = createApiResponseSchema(ProgramsOverviewDataSchema);

export const GetProgramResponseSchema = z.object({
  success: z.boolean(),
  data: ProgramWithIdSchema,
  students: z.array(StudentResponseSchema).optional(),
  vc: z.union([z.record(z.unknown()), z.array(z.unknown())]).optional()
});

export const CreateProgramResponseSchema = createApiResponseSchema(ProgramWithIdSchema);

export const UpdateProgramResponseSchema = z.object({
  success: z.boolean(),
  data: ProgramWithIdSchema.optional(),
  vc: z.array(z.unknown()).optional()
});

export const DeleteProgramResponseSchema = SuccessResponseSchema;

export const GetSchoolsDistributionResponseSchema = createApiResponseSchema(
  z.array(SchoolDistributionItemSchema)
);

export const GetDistinctSchoolsResponseSchema = createApiResponseSchema(
  z.array(SchoolAttributeItemSchema)
);

export const UpdateSchoolAttributesResponseSchema = SuccessResponseSchema;

export const GetSameProgramStudentsResponseSchema = createApiResponseSchema(
  z.array(StudentResponseSchema)
);

export const GetProgramChangeRequestsResponseSchema = createApiResponseSchema(z.array(z.unknown()));

export const ReviewProgramChangeRequestsResponseSchema = SuccessResponseSchema;

export const RefreshProgramResponseSchema = UpdateProgramResponseSchema;

// =========== Inferred types ===========

/** { school, country, city, programCount } */
export type SchoolDistributionItem = z.infer<typeof SchoolDistributionItemSchema>;

/** School attribute item from GET /api/programs/schools */
export type SchoolAttributeItem = z.infer<typeof SchoolAttributeItemSchema>;

/** Top-applying program in the programs overview */
export type TopApplicationProgram = z.infer<typeof TopApplicationProgramSchema>;

/** Recently updated program entry */
export type RecentlyUpdatedProgram = z.infer<typeof RecentlyUpdatedProgramSchema>;

/** Full programs overview payload */
export type ProgramsOverviewData = z.infer<typeof ProgramsOverviewDataSchema>;

/** GET /api/programs */
export type GetProgramsResponse = z.infer<typeof GetProgramsResponseSchema>;

/** GET /api/programs/overview */
export type GetProgramsOverviewResponse = z.infer<typeof GetProgramsOverviewResponseSchema>;

/**
 * GET /api/programs/:programId
 * Non-standard: has extra top-level fields beyond `data`
 */
export type GetProgramResponse = z.infer<typeof GetProgramResponseSchema>;

/** POST /api/programs */
export type CreateProgramResponse = z.infer<typeof CreateProgramResponseSchema>;

/**
 * PUT /api/programs/:id
 * Non-standard: also returns vc (version control)
 */
export type UpdateProgramResponse = z.infer<typeof UpdateProgramResponseSchema>;

/** DELETE /api/programs/:program_id */
export type DeleteProgramResponse = z.infer<typeof DeleteProgramResponseSchema>;

/** GET /api/programs/schools-distribution */
export type GetSchoolsDistributionResponse = z.infer<typeof GetSchoolsDistributionResponseSchema>;

/** GET /api/programs/schools */
export type GetDistinctSchoolsResponse = z.infer<typeof GetDistinctSchoolsResponseSchema>;

/** PUT /api/programs/schools */
export type UpdateSchoolAttributesResponse = z.infer<typeof UpdateSchoolAttributesResponseSchema>;

/** GET /api/programs/same-program-students/:programId */
export type GetSameProgramStudentsResponse = z.infer<typeof GetSameProgramStudentsResponseSchema>;

/** GET /api/programs/:programId/change-requests */
export type GetProgramChangeRequestsResponse = z.infer<
  typeof GetProgramChangeRequestsResponseSchema
>;

/** POST /api/programs/review-changes/:requestId */
export type ReviewProgramChangeRequestsResponse = z.infer<
  typeof ReviewProgramChangeRequestsResponseSchema
>;

/**
 * POST /api/programs/:programId/refresh
 * Same shape as UpdateProgramResponse
 */
export type RefreshProgramResponse = z.infer<typeof RefreshProgramResponseSchema>;
