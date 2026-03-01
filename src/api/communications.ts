import type { ApiResponse, SuccessResponse } from './common';
import type { ICommunicationWithId } from './serialized';

/** GET /api/communications/:studentId */
export type GetCommunicationThreadResponse =
  ApiResponse<ICommunicationWithId[]>;

/** GET /api/communications/all */
export type GetMyCommunicationThreadResponse =
  ApiResponse<ICommunicationWithId[]>;

/** GET /api/communications/ping/all */
export type GetCommunicationUnreadNumberResponse = ApiResponse<number>;

/** POST /api/communications/:studentId */
export type PostCommunicationResponse = ApiResponse<ICommunicationWithId>;

/** GET /api/communications/:studentId/pages/:pageNumber */
export type LoadCommunicationThreadResponse =
  ApiResponse<ICommunicationWithId[]>;

/** PUT /api/communications/:communication_id/:communication_messageId */
export type UpdateCommunicationMessageResponse =
  ApiResponse<ICommunicationWithId>;

/** DELETE /api/communications/:student_id/:communication_messageId */
export type DeleteCommunicationMessageResponse = SuccessResponse;

/** PUT /api/communications/:student_id/:communication_messageId/:ignoreMessageState/ignore */
export type IgnoreCommunicationMessageResponse =
  ApiResponse<ICommunicationWithId>;
