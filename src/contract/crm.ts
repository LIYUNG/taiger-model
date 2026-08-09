import { z } from 'zod';

import {
  AppendCRMLeadTagsResponseSchema,
  CRMLeadNotesResponseSchema,
  CreateCRMDealResponseSchema,
  CreateLeadFromStudentResponseSchema,
  DeleteCRMLeadNoteResponseSchema,
  DeleteCRMLeadTagsResponseSchema,
  GetCRMDealsResponseSchema,
  GetCRMLeadNullableResponseSchema,
  GetCRMLeadsResponseSchema,
  GetCRMMeetingResponseSchema,
  GetCRMMeetingsResponseSchema,
  GetCRMSalesRepsResponseSchema,
  GetCRMStatsResponseSchema,
  GetLeadIdByUserIdResponseSchema,
  InstantInviteResponseSchema,
  UpdateCRMDealResponseSchema,
  UpdateCRMLeadResponseSchema,
  UpdateCRMMeetingResponseSchema
} from '../api/crm';
import { defineContract } from './types';

/**
 * The sales CRM: leads, their tags and notes, meetings, deals and the pipeline
 * statistics. Backed by PostgreSQL rather than Mongo, which changes nothing
 * about the contract — a path, a request and a response.
 */

const LeadParams = z.object({ leadId: z.string().min(1) });

const LeadNoteParams = z.object({
  leadId: z.string().min(1),
  noteId: z.string().min(1)
});

/**
 * Tag removal accepts ids or names, one or many — four spellings the handler
 * has always understood. Stated here so the shape is documented rather than
 * discovered.
 */
const DeleteLeadTagsBodySchema = z.object({
  tagIds: z.array(z.string()).optional(),
  tagId: z.string().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  tag: z.string().optional()
});

export const crmContract = {
  getLead: defineContract({
    method: 'get',
    path: '/api/crm/leads/:leadId',
    tags: ['CRM'],
    summary: 'Get a lead with its meetings',
    params: LeadParams,
    response: GetCRMLeadNullableResponseSchema
  }),

  updateLead: defineContract({
    method: 'put',
    path: '/api/crm/leads/:leadId',
    tags: ['CRM'],
    summary: 'Update a lead',
    params: LeadParams,
    response: UpdateCRMLeadResponseSchema
  }),

  appendLeadTags: defineContract({
    method: 'post',
    path: '/api/crm/leads/:leadId/tags',
    tags: ['CRM'],
    summary: 'Add tags to a lead',
    params: LeadParams,
    body: z.object({
      tags: z.union([z.string(), z.array(z.string())]).optional()
    }),
    response: AppendCRMLeadTagsResponseSchema
  }),

  deleteLeadTags: defineContract({
    method: 'delete',
    path: '/api/crm/leads/:leadId/tags',
    tags: ['CRM'],
    summary: 'Remove tags from a lead',
    params: LeadParams,
    body: DeleteLeadTagsBodySchema,
    response: DeleteCRMLeadTagsResponseSchema
  }),

  createLeadNote: defineContract({
    method: 'post',
    path: '/api/crm/leads/:leadId/notes',
    tags: ['CRM'],
    summary: 'Add notes to a lead',
    params: LeadParams,
    body: z.object({
      note: z.union([z.string(), z.array(z.string())]).optional(),
      notes: z.union([z.string(), z.array(z.string())]).optional()
    }),
    successStatus: 201,
    response: CRMLeadNotesResponseSchema
  }),

  updateLeadNote: defineContract({
    method: 'patch',
    path: '/api/crm/leads/:leadId/notes/:noteId',
    tags: ['CRM'],
    summary: 'Edit a note on a lead',
    params: LeadNoteParams,
    body: z.object({ note: z.union([z.string(), z.array(z.string())]) }),
    response: CRMLeadNotesResponseSchema
  }),

  deleteLeadNote: defineContract({
    method: 'delete',
    path: '/api/crm/leads/:leadId/notes/:noteId',
    tags: ['CRM'],
    summary: 'Delete a note from a lead',
    params: LeadNoteParams,
    response: DeleteCRMLeadNoteResponseSchema
  }),

  getLeadByStudentId: defineContract({
    method: 'get',
    path: '/api/crm/students/:studentId/lead',
    tags: ['CRM'],
    summary: "Get the lead id for a student, if one exists",
    params: z.object({ studentId: z.string().min(1) }),
    response: GetLeadIdByUserIdResponseSchema
  }),

  createLeadFromStudent: defineContract({
    method: 'post',
    path: '/api/crm/students/:studentId/lead',
    tags: ['CRM'],
    summary: 'Create a lead from an existing student',
    params: z.object({ studentId: z.string().min(1) }),
    successStatus: 201,
    response: CreateLeadFromStudentResponseSchema
  }),

  getLeads: defineContract({
    method: 'get',
    path: '/api/crm/leads',
    tags: ['CRM'],
    summary: 'Get every lead with its meeting count',
    response: GetCRMLeadsResponseSchema
  }),

  getMeeting: defineContract({
    method: 'get',
    path: '/api/crm/meetings/:meetingId',
    tags: ['CRM'],
    summary: 'Get a meeting transcript',
    params: z.object({ meetingId: z.string().min(1) }),
    response: GetCRMMeetingResponseSchema
  }),

  updateMeeting: defineContract({
    method: 'put',
    path: '/api/crm/meetings/:meetingId',
    tags: ['CRM'],
    summary: 'Update a meeting transcript',
    params: z.object({ meetingId: z.string().min(1) }),
    response: UpdateCRMMeetingResponseSchema
  }),

  getMeetings: defineContract({
    method: 'get',
    path: '/api/crm/meetings',
    tags: ['CRM'],
    summary: 'Get the meeting list',
    response: GetCRMMeetingsResponseSchema
  }),

  getCRMStats: defineContract({
    method: 'get',
    path: '/api/crm/stats',
    tags: ['CRM'],
    summary: 'Get the pipeline statistics',
    response: GetCRMStatsResponseSchema
  }),

  getSalesReps: defineContract({
    method: 'get',
    path: '/api/crm/sales-reps',
    tags: ['CRM'],
    summary: 'Get the sales representatives',
    response: GetCRMSalesRepsResponseSchema
  }),

  updateDeal: defineContract({
    method: 'put',
    path: '/api/crm/deals/:dealId',
    tags: ['CRM'],
    summary: 'Update a deal',
    params: z.object({ dealId: z.string().min(1) }),
    response: UpdateCRMDealResponseSchema
  }),

  getDeals: defineContract({
    method: 'get',
    path: '/api/crm/deals',
    tags: ['CRM'],
    summary: 'Get every deal',
    response: GetCRMDealsResponseSchema
  }),

  createDeal: defineContract({
    method: 'post',
    path: '/api/crm/deals',
    tags: ['CRM'],
    summary: 'Create a deal',
    successStatus: 201,
    response: CreateCRMDealResponseSchema
  }),

  instantInvite: defineContract({
    method: 'post',
    path: '/api/crm/instant-invite',
    tags: ['CRM'],
    summary: 'Invite the meeting assistant to a live call',
    body: z.object({
      meetingSummary: z.string().min(1),
      meetingLink: z.string().min(1)
    }),
    response: InstantInviteResponseSchema
  })
} as const;
