import type { ApiResponse, SuccessResponse } from './common';
import type { ITicketWithId, IComplaintWithId } from './serialized';

// --- Program Tickets ---

/** GET /api/tickets */
export type GetProgramTicketsResponse = ApiResponse<ITicketWithId[]>;

/** GET /api/tickets?type=&program_id= (single ticket) */
export type GetProgramTicketResponse = ApiResponse<ITicketWithId[]>;

/** POST /api/tickets/ */
export type CreateTicketResponse = ApiResponse<ITicketWithId>;

/** PUT /api/tickets/:ticket_id */
export type UpdateTicketResponse = ApiResponse<ITicketWithId>;

/** DELETE /api/tickets/:ticket_id */
export type DeleteTicketResponse = SuccessResponse;

// --- Complaints ---

/** GET /api/complaints */
export type GetComplaintsResponse = ApiResponse<IComplaintWithId[]>;

/** GET /api/complaints/:ticketId */
export type GetComplaintResponse = ApiResponse<IComplaintWithId>;

/** POST /api/complaints/ */
export type CreateComplaintResponse = ApiResponse<IComplaintWithId>;

/** PUT /api/complaints/:ticketId */
export type UpdateComplaintResponse = ApiResponse<IComplaintWithId>;

/** POST /api/complaints/new-message/:ticketId/:studentId */
export type PostMessageInComplaintResponse = ApiResponse<IComplaintWithId>;

/** DELETE /api/complaints/:ticketId/:message_id */
export type DeleteMessageInComplaintResponse = SuccessResponse;

/** DELETE /api/complaints/:ticketId */
export type DeleteComplaintResponse = SuccessResponse;
