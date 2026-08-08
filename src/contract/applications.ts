import { z } from 'zod';

import {
  CreateApplicationResponseSchema,
  DeleteApplicationResponseSchema,
  GetApplicationProgramsUpdateStatusResponseSchema,
  GetApplicationsDeadlineDistributionResponseSchema,
  GetApplicationsResponseSchema,
  GetMyStudentsApplicationsStatsResponseSchema,
  GetStudentApplicationsResponseSchema,
  GetStudentsApplicationsPaginatedResponseSchema,
  RefreshApplicationResponseSchema,
  UpdateApplicationResponseSchema,
  UpdateStudentApplicationsResponseSchema
} from '../api/applications';
import { defineContract } from './types';

/**
 * Student applications: the rows, the page, and the three aggregates the
 * dashboards are built from.
 */

const StudentParams = z.object({ studentId: z.string().min(1) });

const StudentApplicationParams = z.object({
  studentId: z.string().min(1),
  application_id: z.string().min(1)
});

/**
 * The supervision scope every aggregate accepts: with `userId` the numbers
 * cover that TaiGer user's students, without it the whole active cohort.
 */
const SupervisionQuery = z.object({ userId: z.string().optional() });

/**
 * The applications table's own query string.
 *
 * Every value arrives as a string — these are read from the URL, not a body —
 * and the DAO coerces and range-limits `page`/`limit` itself, so the schema
 * documents the keys rather than re-deciding the defaults.
 */
const PaginatedApplicationsQuery = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
  /** Scope: a TaiGer user's supervised students. */
  userId: z.string().optional(),
  /** `false` -> active students only, `true` -> archived only, omitted -> all. */
  archiv: z.string().optional(),
  decided: z.string().optional(),
  closed: z.string().optional(),
  admission: z.string().optional(),
  application_year: z.string().optional(),
  /** Comma-separated, matching the programs list endpoint. */
  country: z.string().optional(),
  semester: z.string().optional(),
  /** Matches the program's school OR name — the table shows them as one column. */
  program: z.string().optional(),
  studentName: z.string().optional(),
  agentName: z.string().optional(),
  editorName: z.string().optional()
});

export const applicationsContract = {
  getApplications: defineContract({
    method: 'get',
    path: '/api/applications',
    tags: ['Applications'],
    summary: 'Get applications',
    query: z.object({
      decided: z.string().optional(),
      closed: z.string().optional(),
      admission: z.string().optional(),
      finalEnrolment: z.string().optional(),
      year: z.string().optional(),
      populate: z.string().optional()
    }),
    response: GetApplicationsResponseSchema
  }),

  getStudentsApplicationsPaginated: defineContract({
    method: 'get',
    path: '/api/applications/applications/paginated',
    tags: ['Applications'],
    summary: 'Get one page of student applications',
    query: PaginatedApplicationsQuery,
    response: GetStudentsApplicationsPaginatedResponseSchema
  }),

  getApplicationsDeadlineDistribution: defineContract({
    method: 'get',
    path: '/api/applications/distribution',
    tags: ['Applications'],
    summary: 'Get the open-applications deadline distribution',
    query: SupervisionQuery,
    response: GetApplicationsDeadlineDistributionResponseSchema
  }),

  getApplicationProgramsUpdateStatus: defineContract({
    method: 'get',
    path: '/api/applications/program-update-status',
    tags: ['Applications'],
    summary: 'Get the programs behind active applications, with update metadata',
    query: SupervisionQuery.extend({
      /** `'O'` restricts to programs with a decided application. */
      decided: z.string().optional()
    }),
    response: GetApplicationProgramsUpdateStatusResponseSchema
  }),

  getMyStudentsApplicationsStats: defineContract({
    method: 'get',
    path: '/api/applications/taiger-user/:userId/stats',
    tags: ['Applications'],
    summary: "Get application stats for a TaiGer user's students",
    params: z.object({ userId: z.string().min(1) }),
    response: GetMyStudentsApplicationsStatsResponseSchema
  }),

  refreshApplication: defineContract({
    method: 'post',
    path: '/api/applications/:applicationId/refresh',
    tags: ['Applications'],
    summary: 'Unlock an application',
    params: z.object({ applicationId: z.string().min(1) }),
    response: RefreshApplicationResponseSchema
  }),

  deleteApplication: defineContract({
    method: 'delete',
    path: '/api/applications/application/:application_id',
    tags: ['Applications'],
    summary: 'Delete an application',
    params: z.object({ application_id: z.string().min(1) }),
    response: DeleteApplicationResponseSchema
  }),

  getStudentApplications: defineContract({
    method: 'get',
    path: '/api/applications/student/:studentId',
    tags: ['Applications'],
    summary: "Get a student's applications",
    params: StudentParams,
    response: GetStudentApplicationsResponseSchema
  }),

  createApplications: defineContract({
    method: 'post',
    path: '/api/applications/student/:studentId',
    tags: ['Applications'],
    summary: 'Assign programs to a student',
    params: StudentParams,
    body: z.object({ program_id_set: z.array(z.string().min(1)) }),
    response: CreateApplicationResponseSchema,
    successStatus: 201
  }),

  updateStudentApplications: defineContract({
    method: 'put',
    path: '/api/applications/student/:studentId',
    tags: ['Applications'],
    summary: "Update a student's application decisions",
    params: StudentParams,
    body: z.object({
      /**
       * Only the four decision flags are read off each row; the client posts
       * the whole application back, and the extra keys are dropped.
       */
      applications: z.array(
        z.object({
          _id: z.string(),
          decided: z.string().optional(),
          closed: z.string().optional(),
          admission: z.string().optional(),
          /** Boolean on the document, unlike the three '-'/'O'/'X' flags. */
          finalEnrolment: z.boolean().optional()
        })
      ),
      /** Sent as a number by the client, parsed with `parseInt` server-side. */
      applying_program_count: z.union([z.string(), z.number()]).optional()
    }),
    response: UpdateStudentApplicationsResponseSchema,
    successStatus: 201
  }),

  updateApplication: defineContract({
    method: 'put',
    path: '/api/applications/student/:studentId/:application_id',
    tags: ['Applications'],
    summary: 'Update one application',
    params: StudentApplicationParams,
    response: UpdateApplicationResponseSchema
  }),

  withdrawApplication: defineContract({
    method: 'put',
    path: '/api/applications/student/:studentId/:application_id/withdraw',
    tags: ['Applications'],
    summary: 'Withdraw or un-withdraw an application',
    params: StudentApplicationParams,
    body: z.object({ closed: z.enum(['X', '-']) }),
    response: UpdateApplicationResponseSchema
  })
} as const;
