import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import { TicketWithIdSchema, ComplaintWithIdSchema } from './serialized';

// =========== Schemas ===========

// --- Program Tickets ---

export const GetProgramTicketsResponseSchema = createApiResponseSchema(z.array(TicketWithIdSchema));

export const GetProgramTicketResponseSchema = createApiResponseSchema(z.array(TicketWithIdSchema));

export const CreateTicketResponseSchema = createApiResponseSchema(TicketWithIdSchema);

export const UpdateTicketResponseSchema = createApiResponseSchema(TicketWithIdSchema);

export const DeleteTicketResponseSchema = SuccessResponseSchema;

// --- Complaints ---

export const GetComplaintsResponseSchema = createApiResponseSchema(z.array(ComplaintWithIdSchema));

export const GetComplaintResponseSchema = createApiResponseSchema(ComplaintWithIdSchema);

export const CreateComplaintResponseSchema = createApiResponseSchema(ComplaintWithIdSchema);

export const UpdateComplaintResponseSchema = createApiResponseSchema(ComplaintWithIdSchema);

export const PostMessageInComplaintResponseSchema = createApiResponseSchema(ComplaintWithIdSchema);

export const DeleteMessageInComplaintResponseSchema = SuccessResponseSchema;

export const DeleteComplaintResponseSchema = SuccessResponseSchema;

// =========== Inferred types ===========

/** GET /api/tickets */
export type GetProgramTicketsResponse = z.infer<typeof GetProgramTicketsResponseSchema>;

/** GET /api/tickets?type=&program_id= (single ticket) */
export type GetProgramTicketResponse = z.infer<typeof GetProgramTicketResponseSchema>;

/** POST /api/tickets/ */
export type CreateTicketResponse = z.infer<typeof CreateTicketResponseSchema>;

/** PUT /api/tickets/:ticket_id */
export type UpdateTicketResponse = z.infer<typeof UpdateTicketResponseSchema>;

/** DELETE /api/tickets/:ticket_id */
export type DeleteTicketResponse = z.infer<typeof DeleteTicketResponseSchema>;

/** GET /api/complaints */
export type GetComplaintsResponse = z.infer<typeof GetComplaintsResponseSchema>;

/** GET /api/complaints/:ticketId */
export type GetComplaintResponse = z.infer<typeof GetComplaintResponseSchema>;

/** POST /api/complaints/ */
export type CreateComplaintResponse = z.infer<typeof CreateComplaintResponseSchema>;

/** PUT /api/complaints/:ticketId */
export type UpdateComplaintResponse = z.infer<typeof UpdateComplaintResponseSchema>;

/** POST /api/complaints/new-message/:ticketId/:studentId */
export type PostMessageInComplaintResponse = z.infer<typeof PostMessageInComplaintResponseSchema>;

/** DELETE /api/complaints/:ticketId/:message_id */
export type DeleteMessageInComplaintResponse = z.infer<typeof DeleteMessageInComplaintResponseSchema>;

/** DELETE /api/complaints/:ticketId */
export type DeleteComplaintResponse = z.infer<typeof DeleteComplaintResponseSchema>;
