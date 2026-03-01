import type { ApiResponse, SuccessResponse } from './common';
import type { IEventWithId, IUserWithId } from './serialized';

/**
 * GET /api/events
 * Non-standard: returns agents/editors alongside event data
 */
export interface GetEventsResponse {
  success: boolean;
  agents?: IUserWithId[];
  editors?: IUserWithId[];
  data?: IEventWithId[];
  hasEvents?: boolean;
}

/** GET /api/events/booked */
export type GetBookedEventsResponse = ApiResponse<IEventWithId[]>;

/** GET /api/events/ping */
export type GetActiveEventsNumberResponse = ApiResponse<number>;

/**
 * POST /api/events
 * Same shape as GetEventsResponse
 */
export type PostEventResponse = GetEventsResponse;

/** GET (single event) */
export type GetEventResponse = ApiResponse<IEventWithId>;

/** PUT /api/events/:event_id/confirm */
export type ConfirmEventResponse = ApiResponse<IEventWithId>;

/** PUT /api/events/:event_id */
export type UpdateEventResponse = ApiResponse<IEventWithId>;

/**
 * DELETE /api/events/:event_id
 * Returns updated events list
 */
export type DeleteEventResponse = GetEventsResponse;

/** PUT /api/account/profile/officehours/:user_id */
export type UpdateOfficehoursResponse = SuccessResponse;
