/**
 * Common API response types shared across all domains.
 */
import { z } from 'zod';

// =========== Schemas ===========

export const SuccessResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional()
});

/**
 * Factory that wraps a data schema in the standard API response envelope.
 * Usage: createApiResponseSchema(z.array(UserWithIdSchema))
 */
export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  SuccessResponseSchema.extend({
    data: dataSchema.optional()
  });

/**
 * Factory for paginated list responses.
 * Usage: createPaginatedResponseSchema(SomeItemSchema)
 */
export const createPaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  createApiResponseSchema(z.array(itemSchema)).extend({
    total: z.number().optional()
  });

// =========== Inferred types ===========

/** Base response for mutation endpoints that return no data payload */
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;

/** Generic API response wrapper used by most backend endpoints */
export type ApiResponse<T = unknown> = SuccessResponse & { data?: T };

/** Paginated list response */
export type PaginatedResponse<T> = ApiResponse<T[]> & { total?: number };

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
