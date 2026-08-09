import { z } from 'zod';
import {
  SuccessResponseSchema,
  createApiResponseSchema,
  createNullableApiResponseSchema
} from './common';

// =========== Schemas ===========

/**
 * A CRM row.
 *
 * `.nullish()` throughout, not `.optional()`: these come from PostgreSQL, where
 * an empty column is NULL and travels as `null` on the wire. The CRM schemas
 * were written as optional and every handler disagreed with them.
 */
/**
 * A row of `GET /api/crm/leads`.
 *
 * The CRM is PostgreSQL-backed, so these mirror the selected columns: an empty
 * column is NULL and travels as `null`, which is why the fields are `.nullish()`
 * rather than the `.optional()` this file used to declare. `salesRep` is the
 * joined sales_reps row, not a name string.
 */
export const CRMLeadItemSchema = z
  .object({
    id: z.string(),
    fullName: z.string().nullish(),
    /** `leads.referral_source`. */
    source: z.string().nullish(),
    email: z.string().nullish(),
    phone: z.string().nullish(),
    status: z.string().nullish(),
    sourceCountry: z.string().nullish(),
    closeLikelihood: z.union([z.string(), z.number()]).nullish(),
    intendedStartTime: z.string().nullish(),
    intendedProgramLevel: z.string().nullish(),
    intendedDirection: z.string().nullish(),
    salesRep: z
      .object({
        userId: z.string().nullish(),
        label: z.string().nullish()
      })
      .nullish(),
    salesNote: z.string().nullish(),
    meetingCount: z.number().nullish(),
    createdAt: z.union([z.string(), z.coerce.date()]).nullish()
  })
  .catchall(z.unknown());

/**
 * A meeting transcript, as the table stores it.
 *
 * This previously declared `dateTime` / `meetingLink` / a string `summary` —
 * none of which exist. The real row carries a `title`, jsonb `speakers` /
 * `participants` / `summary` / `meetingInfo`, and both an epoch `date` and a
 * formatted `dateString`. `leadFullName` is joined on for the list view.
 */
export const CRMMeetingItemSchema = z
  .object({
    id: z.string(),
    title: z.string().nullish(),
    speakers: z.unknown().nullish(),
    transcriptUrl: z.string().nullish(),
    participants: z.unknown().nullish(),
    meetingAttendees: z.unknown().nullish(),
    duration: z.number().nullish(),
    /** Epoch milliseconds. */
    date: z.number().nullish(),
    dateString: z.string().nullish(),
    summary: z.unknown().nullish(),
    meetingInfo: z.unknown().nullish(),
    isArchived: z.boolean().nullish(),
    leadId: z.string().nullish(),
    leadFullName: z.string().nullish()
  })
  .catchall(z.unknown());

/** `GET /api/crm/leads/:leadId` — the lead plus everything hanging off it. */
export const CRMLeadWithMeetingsSchema = CRMLeadItemSchema.extend({
  meetings: z.array(CRMMeetingItemSchema).nullish(),
  tags: z.array(z.unknown()).nullish(),
  notes: z.array(z.unknown()).nullish()
});

/**
 * A deal. `id` is a Postgres `serial`, so it is a number — the previous schema
 * called it a string, which is the sort of thing an editing client notices at
 * runtime and nowhere else.
 */
export const CRMDealItemSchema = z
  .object({
    id: z.number(),
    leadId: z.string().nullish(),
    salesUserId: z.string().nullish(),
    status: z
      .enum(['initiated', 'sent', 'signed', 'closed', 'canceled'])
      .nullish(),
    closedDate: z.string().nullish(),
    initiatedAt: z.string().nullish(),
    sentAt: z.string().nullish(),
    signedAt: z.string().nullish(),
    closedAt: z.string().nullish(),
    canceledAt: z.string().nullish(),
    /** `numeric(12,2)`, carried as a string so the precision survives. */
    dealSizeNtd: z.string().nullish(),
    note: z.string().nullish(),
    createdAt: z.union([z.string(), z.coerce.date()]).nullish(),
    updatedAt: z.union([z.string(), z.coerce.date()]).nullish(),
    leadFullName: z.string().nullish(),
    salesLabel: z.string().nullish()
  })
  .catchall(z.unknown());

/** A sales rep: keyed by `userId`, with a display `label`. */
export const CRMSalesRepSchema = z
  .object({
    userId: z.string(),
    label: z.string(),
    isActive: z.boolean()
  })
  .catchall(z.unknown());

export const CRMStatsDataSchema = z.object({
  totalLeadCount: z.number().optional(),
  recentLeadCount: z.number().optional(),
  convertedLeadCount: z.number().optional(),
  totalMeetingCount: z.number().optional(),
  recentMeetingCount: z.number().optional(),
  avgResponseTimeDays: z.number().nullish(),
  p50ResponseTimeDays: z.number().nullish(),
  p95ResponseTimeDays: z.number().nullish(),
  avgSalesCycleDays: z.number().nullish(),
  p50SalesCycleDays: z.number().nullish(),
  p95SalesCycleDays: z.number().nullish(),
  leadsCountByDate: z.array(z.unknown()).optional(),
  meetingCountByDate: z.array(z.unknown()).optional(),
  totalLeadsWithMeeting: z.number().optional(),
  totalLeadsWithFollowUp: z.number().optional()
});

export const GetCRMStatsResponseSchema = createApiResponseSchema(CRMStatsDataSchema);

export const GetCRMLeadsResponseSchema = createApiResponseSchema(z.array(CRMLeadItemSchema));

export const GetCRMLeadResponseSchema = createApiResponseSchema(CRMLeadWithMeetingsSchema);

/**
 * `GET /api/crm/leads/:leadId` answers 200 with `data: null` when the lead is
 * gone rather than 404, so the nullable envelope is the accurate one.
 */
export const GetCRMLeadNullableResponseSchema = createNullableApiResponseSchema(
  CRMLeadWithMeetingsSchema
);

export const UpdateCRMLeadResponseSchema = createApiResponseSchema(
  CRMLeadWithMeetingsSchema
);

// --- Lead tags and notes ---

export const CRMLeadTagSchema = z
  .object({
    id: z.string().optional(),
    tag: z.string().nullish(),
    createdBy: z.string().nullish(),
    createdAt: z.union([z.string(), z.coerce.date()]).nullish()
  })
  .catchall(z.unknown());

/** `POST /api/crm/leads/:leadId/tags` returns the lead's tags after the append. */
export const AppendCRMLeadTagsResponseSchema = createApiResponseSchema(
  z.array(CRMLeadTagSchema)
);

/**
 * `DELETE /api/crm/leads/:leadId/tags` echoes back what it removed — the tag
 * ids when the caller sent ids, the tag names when it sent names.
 */
export const DeleteCRMLeadTagsResponseSchema = createApiResponseSchema(
  z.array(z.string())
);

export const CRMLeadNoteSchema = z
  .object({
    id: z.string().optional(),
    note: z.string().nullish(),
    createdBy: z.string().nullish(),
    createdAt: z.union([z.string(), z.coerce.date()]).nullish()
  })
  .catchall(z.unknown());

/** Create and update both answer with an array, even for a single note. */
export const CRMLeadNotesResponseSchema = createApiResponseSchema(
  z.array(CRMLeadNoteSchema)
);

export const DeleteCRMLeadNoteResponseSchema = createApiResponseSchema(
  z.object({ id: z.string() })
);

export const GetLeadIdByUserIdResponseSchema = createApiResponseSchema(
  z.object({ id: z.string() })
);

export const CreateLeadFromStudentResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  /** `null` when the driver does not report a row count. */
  matchingMeetingCounts: z.number().nullish(),
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

/** A tag on a lead. */
export type CRMLeadTag = z.infer<typeof CRMLeadTagSchema>;

/** A note on a lead. */
export type CRMLeadNote = z.infer<typeof CRMLeadNoteSchema>;

/** GET /api/crm/leads/:leadId */
export type GetCRMLeadNullableResponse = z.infer<
  typeof GetCRMLeadNullableResponseSchema
>;

/** PUT /api/crm/leads/:leadId */
export type UpdateCRMLeadResponse = z.infer<typeof UpdateCRMLeadResponseSchema>;

/** POST /api/crm/leads/:leadId/tags */
export type AppendCRMLeadTagsResponse = z.infer<
  typeof AppendCRMLeadTagsResponseSchema
>;

/** DELETE /api/crm/leads/:leadId/tags */
export type DeleteCRMLeadTagsResponse = z.infer<
  typeof DeleteCRMLeadTagsResponseSchema
>;

/** POST and PATCH of a lead note */
export type CRMLeadNotesResponse = z.infer<typeof CRMLeadNotesResponseSchema>;

/** DELETE /api/crm/leads/:leadId/notes/:noteId */
export type DeleteCRMLeadNoteResponse = z.infer<
  typeof DeleteCRMLeadNoteResponseSchema
>;

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
