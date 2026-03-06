
/**
 * Student meeting — no dedicated Mongoose model.
 * Represents a scheduled meeting between a student and a TaiGer staff member.
 */
export interface IMeeting {
  _id: string;
  title?: string;
  dateTime?: string | Date;
  location?: string;
  description?: string;
  notes?: string;
  isConfirmed?: boolean;
  isConfirmedReceiver?: boolean;
  isConfirmedRequester?: boolean;
  attended?: boolean;
  meetingLink?: string;
  requester_id?: string[];
  receiver_id?: string[];
  [key: string]: unknown;
}
