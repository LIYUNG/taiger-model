/**
 * Common API response types shared across all domains.
 */

/** Base response for mutation endpoints that return no data payload */
export interface SuccessResponse {
  success: boolean;
  message?: string;
}

/** Generic API response wrapper used by most backend endpoints */
export interface ApiResponse<T = unknown> extends SuccessResponse {
  data?: T;
}

/** Paginated list response */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total?: number;
}

// --- ID type aliases (API path params are always strings) ---
export type StudentId = string;
export type ApplicationId = string;
export type UserId = string;
export type ProgramId = string;
export type DocumentThreadId = string;
export type MessageId = string;
export type SurveyId = string;
export type EventId = string;
export type TicketId = string;
export type MeetingId = string;
export type InterviewId = string;
export type LeadId = string;
export type CourseId = string;
export type KeywordsSetId = string;
