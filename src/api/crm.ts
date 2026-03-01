import type { ApiResponse, SuccessResponse } from './common';

/**
 * CRM-specific types.
 * The CRM module uses a relational database (PostgreSQL), not MongoDB,
 * so all types are defined purely from the API response shape.
 */

/** A CRM lead record */
export interface CRMLeadItem {
  id?: string;
  fullName?: string;
  source?: string;
  email?: string;
  phone?: string;
  status?: string;
  closeLikelihood?: string | number;
  intendedStartTime?: string;
  intendedProgramLevel?: string;
  intendedDirection?: string;
  salesRep?: string;
  salesNote?: string;
  meetingCount?: number;
  createdAt?: string | Date;
  [key: string]: unknown;
}

/** A CRM lead with its associated meetings */
export interface CRMLeadWithMeetings extends CRMLeadItem {
  meetings?: CRMMeetingItem[];
}

/** A CRM meeting record */
export interface CRMMeetingItem {
  id?: string;
  leadId?: string;
  leadFullName?: string;
  dateTime?: string | Date;
  summary?: string;
  meetingLink?: string;
  [key: string]: unknown;
}

/** A CRM deal record */
export interface CRMDealItem {
  id?: string;
  dealDataCols?: unknown;
  leadFullName?: string;
  salesLabel?: string;
  [key: string]: unknown;
}

/** A CRM sales representative */
export interface CRMSalesRep {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}

/** CRM statistics summary */
export interface CRMStatsData {
  totalLeadCount?: number;
  recentLeadCount?: number;
  convertedLeadCount?: number;
  totalMeetingCount?: number;
  recentMeetingCount?: number;
  avgResponseTimeDays?: number;
  p50ResponseTimeDays?: number;
  p95ResponseTimeDays?: number;
  avgSalesCycleDays?: number;
  p50SalesCycleDays?: number;
  p95SalesCycleDays?: number;
  leadsCountByDate?: unknown[];
  meetingCountByDate?: unknown[];
  totalLeadsWithMeeting?: number;
  totalLeadsWithFollowUp?: number;
}

/** GET /api/crm/stats */
export type GetCRMStatsResponse = ApiResponse<CRMStatsData>;

/** GET /api/crm/leads */
export type GetCRMLeadsResponse = ApiResponse<CRMLeadItem[]>;

/** GET /api/crm/leads/:leadId */
export type GetCRMLeadResponse = ApiResponse<CRMLeadWithMeetings>;

/** GET /api/crm/students/:userId/lead */
export type GetLeadIdByUserIdResponse = ApiResponse<{ id: string }>;

/**
 * POST /api/crm/students/:userId/lead
 * Non-standard: includes matchingMeetingCounts alongside data
 */
export interface CreateLeadFromStudentResponse {
  success: boolean;
  message?: string;
  matchingMeetingCounts?: number;
  data?: CRMLeadItem;
}

/** GET /api/crm/meetings */
export type GetCRMMeetingsResponse = ApiResponse<CRMMeetingItem[]>;

/** GET /api/crm/meetings/:meetingId */
export type GetCRMMeetingResponse = ApiResponse<CRMMeetingItem>;

/** PUT /api/crm/meetings/:meetingId */
export type UpdateCRMMeetingResponse = ApiResponse<CRMMeetingItem>;

/** GET /api/crm/deals */
export type GetCRMDealsResponse = ApiResponse<CRMDealItem[]>;

/** POST /api/crm/deals */
export type CreateCRMDealResponse = ApiResponse<CRMDealItem>;

/** PUT /api/crm/deals/:dealId */
export type UpdateCRMDealResponse = ApiResponse<CRMDealItem>;

/** GET /api/crm/sales-reps */
export type GetCRMSalesRepsResponse = ApiResponse<CRMSalesRep[]>;

/** POST /api/crm/instant-invite */
export type InstantInviteResponse = SuccessResponse;
