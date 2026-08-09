import { z } from 'zod';

import {
  GetApplicationConflictsResponseSchema,
  GetApplicationTaskDeltasResponseSchema
} from '../api/applications';
import {
  CreateKeywordsetResponseSchema,
  DeleteKeywordsetResponseSchema,
  GetCourseKeywordsetsResponseSchema,
  UpdateKeywordsetResponseSchema
} from '../api/courses';
import {
  CreatePortalCredentialsResponseSchema,
  GetPortalCredentialsResponseSchema
} from '../api/portals';
import { GetQueryStudentsResultsResponseSchema } from '../api/search';
import { GetExpenseResponseSchema } from '../api/widgets';
import { createApiResponseSchema } from '../api/common';
import { defineContract } from './types';

/**
 * Contracts for the small, self-contained routers.
 *
 * These declare path, params and response. A `body` is only declared where the
 * calling code was read first — a guessed body schema rejects requests the
 * client legitimately sends (see the permissions round-trip), whereas leaving
 * it out changes no runtime behaviour and still removes URL and response drift.
 */

// ---------------------------------------------------------------- search

export const searchContract = {
  getQueryStudentsResults: defineContract({
    method: 'get',
    path: '/api/search/students',
    tags: ['Search'],
    summary: 'Search students',
    query: z.object({ q: z.string().optional() }),
    response: GetQueryStudentsResultsResponseSchema
  }),

  search: defineContract({
    method: 'get',
    path: '/api/search',
    tags: ['Search'],
    summary: 'Global search',
    query: z.object({ q: z.string().optional() }),
    response: createApiResponseSchema(z.array(z.unknown()))
  })
} as const;

// ---------------------------------------------------------------- student applications

export const studentApplicationsContract = {
  getApplicationConflicts: defineContract({
    method: 'get',
    path: '/api/student-applications/conflicts',
    tags: ['Applications'],
    summary: 'Get application conflicts',
    response: GetApplicationConflictsResponseSchema
  }),

  getApplicationTaskDeltas: defineContract({
    method: 'get',
    path: '/api/student-applications/deltas',
    tags: ['Applications'],
    summary: 'Get per-program student deltas',
    response: GetApplicationTaskDeltasResponseSchema
  })
} as const;

// ---------------------------------------------------------------- portal credentials

export const portalCredentialsContract = {
  getPortalCredentials: defineContract({
    method: 'get',
    path: '/api/portal-informations/:studentId',
    tags: ['Portal Credentials'],
    summary: 'Get a student portal credentials',
    params: z.object({ studentId: z.string().min(1) }),
    response: GetPortalCredentialsResponseSchema
  }),

  setPortalCredentials: defineContract({
    method: 'post',
    path: '/api/portal-informations/:studentId/:applicationId',
    tags: ['Portal Credentials'],
    summary: 'Set the portal credentials for an application',
    params: z.object({
      studentId: z.string().min(1),
      applicationId: z.string().min(1)
    }),
    // The updated application, not the credentials read above — this pointed at
    // the GET's shape and described a payload the handler has never sent.
    response: CreatePortalCredentialsResponseSchema
  })
} as const;

// ---------------------------------------------------------------- course keywords

const KeywordsSetParamsSchema = z.object({
  keywordsSetId: z.string().min(1)
});

export const courseKeywordsContract = {
  getCourseKeywordsets: defineContract({
    method: 'get',
    path: '/api/course-keywords',
    tags: ['Course Keywords'],
    summary: 'Get all keyword sets',
    response: GetCourseKeywordsetsResponseSchema
  }),

  createKeywordset: defineContract({
    method: 'post',
    path: '/api/course-keywords/:keywordsSetId',
    tags: ['Course Keywords'],
    summary: 'Create a keyword set',
    params: KeywordsSetParamsSchema,
    response: CreateKeywordsetResponseSchema
  }),

  updateKeywordset: defineContract({
    method: 'put',
    path: '/api/course-keywords/:keywordsSetId',
    tags: ['Course Keywords'],
    summary: 'Update a keyword set',
    params: KeywordsSetParamsSchema,
    response: UpdateKeywordsetResponseSchema
  }),

  deleteKeywordset: defineContract({
    method: 'delete',
    path: '/api/course-keywords/:keywordsSetId',
    tags: ['Course Keywords'],
    summary: 'Delete a keyword set',
    params: KeywordsSetParamsSchema,
    response: DeleteKeywordsetResponseSchema
  })
} as const;

// ---------------------------------------------------------------- expenses

export const expensesContract = {
  getExpense: defineContract({
    method: 'get',
    path: '/api/expenses/users/:taiger_user_id',
    tags: ['Expenses'],
    summary: 'Get the expense breakdown for a staff member',
    params: z.object({ taiger_user_id: z.string().min(1) }),
    response: GetExpenseResponseSchema
  })
} as const;
