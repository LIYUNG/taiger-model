import { z } from 'zod';

import {
  CreateProgramResponseSchema,
  DeleteProgramResponseSchema,
  GetDistinctSchoolsResponseSchema,
  GetProgramChangeRequestsResponseSchema,
  GetProgramResponseSchema,
  GetProgramsOverviewResponseSchema,
  GetProgramsResponseSchema,
  GetSameProgramStudentsResponseSchema,
  GetSchoolsDistributionResponseSchema,
  RefreshProgramResponseSchema,
  ReviewProgramChangeRequestsResponseSchema,
  SubmitProgramChangeRequestsResponseSchema,
  UpdateProgramResponseSchema,
  UpdateSchoolAttributesResponseSchema
} from '../api/programs';
import { defineContract } from './types';

/** The program catalogue, its aggregates, and the change-request workflow. */

const ProgramParams = z.object({ programId: z.string().min(1) });

/**
 * The program table's query string.
 *
 * The service owns the defaults and the allow-lists — an unknown `sortBy`
 * falls back to `school`, a `lockStatus` outside Locked/Unlocked is ignored —
 * so the schema names the keys rather than restating those rules.
 */
const ProgramsQuery = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
  /** 'Locked' | 'Unlocked'; anything else leaves the filter unset. */
  lockStatus: z.string().optional(),
  // Contains-match text columns.
  school: z.string().optional(),
  program_name: z.string().optional(),
  degree: z.string().optional(),
  semester: z.string().optional(),
  lang: z.string().optional(),
  toefl: z.string().optional(),
  ielts: z.string().optional(),
  gre: z.string().optional(),
  gmat: z.string().optional(),
  application_deadline: z.string().optional(),
  // Comma-separated multi-selects.
  country: z.string().optional(),
  programSubjects: z.string().optional(),
  tags: z.string().optional(),
  // Exact booleans: only the literal 'true'/'false' are honoured.
  isPrivateSchool: z.string().optional(),
  isPartnerSchool: z.string().optional(),
  isNC: z.string().optional()
});

/** The school-wide attributes the batch editor writes across a school's programs. */
const UpdateSchoolAttributesBodySchema = z.object({
  school: z.string().min(1),
  isPrivateSchool: z.boolean().optional(),
  isPartnerSchool: z.boolean().optional(),
  schoolType: z.string().optional(),
  country: z.string().optional(),
  tags: z.array(z.string()).optional()
});

export const programsContract = {
  getProgramsOverview: defineContract({
    method: 'get',
    path: '/api/programs/overview',
    tags: ['Programs'],
    summary: 'Get aggregated statistics over the program catalogue',
    response: GetProgramsOverviewResponseSchema
  }),

  getSchoolsDistribution: defineContract({
    method: 'get',
    path: '/api/programs/schools-distribution',
    tags: ['Programs'],
    summary: 'Get every school with its program count',
    response: GetSchoolsDistributionResponseSchema
  }),

  getSameProgramStudents: defineContract({
    method: 'get',
    path: '/api/programs/same-program-students/:programId',
    tags: ['Programs'],
    summary: 'Get the students who applied to a program',
    params: ProgramParams,
    response: GetSameProgramStudentsResponseSchema
  }),

  getPrograms: defineContract({
    method: 'get',
    path: '/api/programs',
    tags: ['Programs'],
    summary: 'Get one page of programs',
    query: ProgramsQuery,
    response: GetProgramsResponseSchema
  }),

  createProgram: defineContract({
    method: 'post',
    path: '/api/programs',
    tags: ['Programs'],
    summary: 'Create a program',
    response: CreateProgramResponseSchema,
    successStatus: 201
  }),

  getDistinctSchoolsAttributes: defineContract({
    method: 'get',
    path: '/api/programs/schools',
    tags: ['Programs'],
    summary: 'Get the distinct school attribute combinations',
    response: GetDistinctSchoolsResponseSchema
  }),

  updateBatchSchoolAttributes: defineContract({
    method: 'put',
    path: '/api/programs/schools',
    tags: ['Programs'],
    summary: "Update one school's attributes across all its programs",
    body: UpdateSchoolAttributesBodySchema,
    response: UpdateSchoolAttributesResponseSchema
  }),

  refreshProgram: defineContract({
    method: 'post',
    path: '/api/programs/:programId/refresh',
    tags: ['Programs'],
    summary: 'Mark a program as verified up-to-date',
    params: ProgramParams,
    response: RefreshProgramResponseSchema
  }),

  getProgramChangeRequests: defineContract({
    method: 'get',
    path: '/api/programs/:programId/change-requests',
    tags: ['Programs'],
    summary: 'Get the open change requests for a program',
    params: ProgramParams,
    response: GetProgramChangeRequestsResponseSchema
  }),

  submitProgramChangeRequest: defineContract({
    method: 'post',
    path: '/api/programs/:programId/change-requests',
    tags: ['Programs'],
    summary: 'Submit a change request for a program',
    params: ProgramParams,
    response: SubmitProgramChangeRequestsResponseSchema
  }),

  reviewProgramChangeRequest: defineContract({
    method: 'post',
    path: '/api/programs/review-changes/:requestId',
    tags: ['Programs'],
    summary: 'Mark a change request as reviewed',
    params: z.object({ requestId: z.string().min(1) }),
    response: ReviewProgramChangeRequestsResponseSchema
  }),

  getProgram: defineContract({
    method: 'get',
    path: '/api/programs/:programId',
    tags: ['Programs'],
    summary: 'Get a program',
    params: ProgramParams,
    response: GetProgramResponseSchema
  }),

  updateProgram: defineContract({
    method: 'put',
    path: '/api/programs/:programId',
    tags: ['Programs'],
    summary: 'Update a program',
    params: ProgramParams,
    response: UpdateProgramResponseSchema
  }),

  deleteProgram: defineContract({
    method: 'delete',
    path: '/api/programs/:programId',
    tags: ['Programs'],
    summary: 'Archive a program',
    params: ProgramParams,
    response: DeleteProgramResponseSchema
  })
} as const;
