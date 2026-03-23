import { z } from 'zod';

// =========== Schemas ===========

export const MeetingSchema = z.object({
  _id: z.string(),
  title: z.string().optional(),
  dateTime: z.union([z.string(), z.coerce.date()]).optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
  isConfirmed: z.boolean().optional(),
  isConfirmedReceiver: z.boolean().optional(),
  isConfirmedRequester: z.boolean().optional(),
  attended: z.boolean().optional(),
  meetingLink: z.string().optional(),
  requester_id: z.array(z.string()).optional(),
  receiver_id: z.array(z.string()).optional()
}).catchall(z.unknown());

// =========== Inferred types ===========

/**
 * Student meeting — no dedicated Mongoose model.
 * Represents a scheduled meeting between a student and a TaiGer staff member.
 */
export type IMeeting = z.infer<typeof MeetingSchema>;
