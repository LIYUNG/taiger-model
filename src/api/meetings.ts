import type { ApiResponse, SuccessResponse } from './common';

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

/** GET /api/students/:studentId/meetings */
export type GetStudentMeetingsResponse = ApiResponse<IMeeting[]>;

/** GET /api/students/:studentId/meetings/:meetingId */
export type GetStudentMeetingResponse = ApiResponse<IMeeting>;

/** POST /api/students/:studentId/meetings */
export type CreateStudentMeetingResponse = ApiResponse<IMeeting>;

/** PUT /api/students/:studentId/meetings/:meetingId */
export type UpdateStudentMeetingResponse = ApiResponse<IMeeting>;

/** DELETE /api/students/:studentId/meetings/:meetingId */
export type DeleteStudentMeetingResponse = SuccessResponse;
