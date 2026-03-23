import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';

// =========== Schemas ===========

export const CRMLeadItemSchema = z
  .object({
    id: z.string().optional(),
    fullName: z.string().optional(),
    source: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    status: z.string().optional(),
    closeLikelihood: z.union([z.string(), z.number()]).optional(),
    intendedStartTime: z.string().optional(),
    intendedProgramLevel: z.string().optional(),
    intendedDirection: z.string().optional(),
    salesRep: z.string().optional(),
    salesNote: z.string().optional(),
    meetingCount: z.number().optional(),
    createdAt: z.union([z.string(), z.coerce.date()]).optional()
  })
  .catchall(z.unknown());

export const CRMMeetingItemSchema = z
  .object({
    id: z.string().optional(),
    leadId: z.string().optional(),
    leadFullName: z.string().optional(),
    dateTime: z.union([z.string(), z.coerce.date()]).optional(),
    summary: z.string().optional(),
    meetingLink: z.string().optional()
  })
  .catchall(z.unknown());

export const CRMLeadWithMeetingsSchema = CRMLeadItemSchema.extend({
  meetings: z.array(CRMMeetingItemSchema).optional()
});

export const CRMDealItemSchema = z
  .object({
    id: z.string().optional(),
    dealDataCols: z.unknown().optional(),
    leadFullName: z.string().optional(),
    salesLabel: z.string().optional()
  })
  .catchall(z.unknown());

export const CRMSalesRepSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional()
  })
  .catchall(z.unknown());

export const CRMStatsDataSchema = z.object({
  totalLeadCount: z.number().optional(),
  recentLeadCount: z.number().optional(),
  convertedLeadCount: z.number().optional(),
  totalMeetingCount: z.number().optional(),
  recentMeetingCount: z.number().optional(),
  avgResponseTimeDays: z.number().optional(),
  p50ResponseTimeDays: z.number().optional(),
  p95ResponseTimeDays: z.number().optional(),
  avgSalesCycleDays: z.number().optional(),
  p50SalesCycleDays: z.number().optional(),
  p95SalesCycleDays: z.number().optional(),
  leadsCountByDate: z.array(z.unknown()).optional(),
  meetingCountByDate: z.array(z.unknown()).optional(),
  totalLeadsWithMeeting: z.number().optional(),
  totalLeadsWithFollowUp: z.number().optional()
});

export const GetCRMStatsResponseSchema = createApiResponseSchema(CRMStatsDataSchema);

export const GetCRMLeadsResponseSchema = createApiResponseSchema(z.array(CRMLeadItemSchema));

export const GetCRMLeadResponseSchema = createApiResponseSchema(CRMLeadWithMeetingsSchema);

export const GetLeadIdByUserIdResponseSchema = createApiResponseSchema(
  z.object({ id: z.string() })
);

export const CreateLeadFromStudentResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  matchingMeetingCounts: z.number().optional(),
  data: CRMLeadItemSchema.optional()
});

export const GetCRMMeetingsResponseSchema = createApiResponseSchema(z.array(CRMMeetingItemSchema));

export const GetCRMMeetingResponseSchema = createApiResponseSchema(CRMMeetingItemSchema);

export const UpdateCRMMeetingResponseSchema = createApiResponseSchema(CRMMeetingItemSchema);

export const GetCRMDealsResponseSchema = createApiResponseSchema(z.array(CRMDealItemSchema));

export const CreateCRMDealResponseSchema = createApiResponseSchema(CRMDealItemSchema);

export const UpdateCRMDealResponseSchema = createApiResponseSchema(CRMDealItemSchema);

export const GetCRMSalesRepsResponseSchema = createApiResponseSchema(z.array(CRMSalesRepSchema));

export const InstantInviteResponseSchema = SuccessResponseSchema;

// =========== Inferred types ===========

/** A CRM lead record */
export type CRMLeadItem = z.infer<typeof CRMLeadItemSchema>;

/** A CRM lead with its associated meetings */
export type CRMLeadWithMeetings = z.infer<typeof CRMLeadWithMeetingsSchema>;

/** A CRM meeting record */
export type CRMMeetingItem = z.infer<typeof CRMMeetingItemSchema>;

/** A CRM deal record */
export type CRMDealItem = z.infer<typeof CRMDealItemSchema>;

/** A CRM sales representative */
export type CRMSalesRep = z.infer<typeof CRMSalesRepSchema>;

/** CRM statistics summary */
export type CRMStatsData = z.infer<typeof CRMStatsDataSchema>;

/** GET /api/crm/stats */
export type GetCRMStatsResponse = z.infer<typeof GetCRMStatsResponseSchema>;

/** GET /api/crm/leads */
export type GetCRMLeadsResponse = z.infer<typeof GetCRMLeadsResponseSchema>;

/** GET /api/crm/leads/:leadId */
export type GetCRMLeadResponse = z.infer<typeof GetCRMLeadResponseSchema>;

/** GET /api/crm/students/:userId/lead */
export type GetLeadIdByUserIdResponse = z.infer<typeof GetLeadIdByUserIdResponseSchema>;

/**
 * POST /api/crm/students/:userId/lead
 * Non-standard: includes matchingMeetingCounts alongside data
 */
export type CreateLeadFromStudentResponse = z.infer<typeof CreateLeadFromStudentResponseSchema>;

/** GET /api/crm/meetings */
export type GetCRMMeetingsResponse = z.infer<typeof GetCRMMeetingsResponseSchema>;

/** GET /api/crm/meetings/:meetingId */
export type GetCRMMeetingResponse = z.infer<typeof GetCRMMeetingResponseSchema>;

/** PUT /api/crm/meetings/:meetingId */
export type UpdateCRMMeetingResponse = z.infer<typeof UpdateCRMMeetingResponseSchema>;

/** GET /api/crm/deals */
export type GetCRMDealsResponse = z.infer<typeof GetCRMDealsResponseSchema>;

/** POST /api/crm/deals */
export type CreateCRMDealResponse = z.infer<typeof CreateCRMDealResponseSchema>;

/** PUT /api/crm/deals/:dealId */
export type UpdateCRMDealResponse = z.infer<typeof UpdateCRMDealResponseSchema>;

/** GET /api/crm/sales-reps */
export type GetCRMSalesRepsResponse = z.infer<typeof GetCRMSalesRepsResponseSchema>;

/** POST /api/crm/instant-invite */
export type InstantInviteResponse = z.infer<typeof InstantInviteResponseSchema>;
