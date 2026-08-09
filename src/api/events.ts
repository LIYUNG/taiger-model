import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import { EventWithIdSchema, UserWithIdSchema } from './serialized';

// =========== Schemas ===========

export const GetEventsResponseSchema = z.object({
  success: z.boolean(),
  agents: z.array(UserWithIdSchema).optional(),
  editors: z.array(UserWithIdSchema).optional(),
  data: z.array(EventWithIdSchema).optional(),
  hasEvents: z.boolean().optional()
});

export const GetBookedEventsResponseSchema = createApiResponseSchema(z.array(EventWithIdSchema));

export const GetActiveEventsNumberResponseSchema = createApiResponseSchema(z.number());

export const PostEventResponseSchema = GetEventsResponseSchema;

export const GetEventResponseSchema = createApiResponseSchema(EventWithIdSchema);

export const ConfirmEventResponseSchema = createApiResponseSchema(EventWithIdSchema);

export const UpdateEventResponseSchema = createApiResponseSchema(EventWithIdSchema);

export const DeleteEventResponseSchema = GetEventsResponseSchema;

export const UpdateOfficehoursResponseSchema = SuccessResponseSchema;

/**
 * `GET /api/events/paginated` — one page plus the unpaginated match count. The
 * contract used to reuse the unpaginated response, which describes a bare array.
 */
export const GetEventsPaginatedResponseSchema = createApiResponseSchema(
  z.object({
    events: z.array(EventWithIdSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number()
  })
);

// =========== Inferred types ===========

/**
 * GET /api/events
 * Non-standard: returns agents/editors alongside event data
 */
export type GetEventsResponse = z.infer<typeof GetEventsResponseSchema>;

/** GET /api/events/booked */
export type GetBookedEventsResponse = z.infer<typeof GetBookedEventsResponseSchema>;

/** GET /api/events/ping */
export type GetActiveEventsNumberResponse = z.infer<typeof GetActiveEventsNumberResponseSchema>;

/**
 * POST /api/events
 * Same shape as GetEventsResponse
 */
export type PostEventResponse = z.infer<typeof PostEventResponseSchema>;

/** GET (single event) */
export type GetEventResponse = z.infer<typeof GetEventResponseSchema>;

/** PUT /api/events/:event_id/confirm */
export type ConfirmEventResponse = z.infer<typeof ConfirmEventResponseSchema>;

/** PUT /api/events/:event_id */
export type UpdateEventResponse = z.infer<typeof UpdateEventResponseSchema>;

/**
 * DELETE /api/events/:event_id
 * Returns updated events list
 */
export type DeleteEventResponse = z.infer<typeof DeleteEventResponseSchema>;

/** PUT /api/account/profile/officehours/:user_id */
export type UpdateOfficehoursResponse = z.infer<typeof UpdateOfficehoursResponseSchema>;

/** GET /api/events/paginated */
export type GetEventsPaginatedResponse = z.infer<
  typeof GetEventsPaginatedResponseSchema
>;
