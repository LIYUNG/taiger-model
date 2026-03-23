import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import { CommunicationWithIdSchema } from './serialized';

// =========== Schemas ===========

export const GetCommunicationThreadResponseSchema = createApiResponseSchema(
  z.array(CommunicationWithIdSchema)
);

export const GetMyCommunicationThreadResponseSchema = createApiResponseSchema(
  z.array(CommunicationWithIdSchema)
);

export const GetCommunicationUnreadNumberResponseSchema = createApiResponseSchema(z.number());

export const PostCommunicationResponseSchema = createApiResponseSchema(CommunicationWithIdSchema);

export const LoadCommunicationThreadResponseSchema = createApiResponseSchema(
  z.array(CommunicationWithIdSchema)
);

export const UpdateCommunicationMessageResponseSchema = createApiResponseSchema(
  CommunicationWithIdSchema
);

export const DeleteCommunicationMessageResponseSchema = SuccessResponseSchema;

export const IgnoreCommunicationMessageResponseSchema = createApiResponseSchema(
  CommunicationWithIdSchema
);

// =========== Inferred types ===========

/** GET /api/communications/:studentId */
export type GetCommunicationThreadResponse = z.infer<typeof GetCommunicationThreadResponseSchema>;

/** GET /api/communications/all */
export type GetMyCommunicationThreadResponse = z.infer<
  typeof GetMyCommunicationThreadResponseSchema
>;

/** GET /api/communications/ping/all */
export type GetCommunicationUnreadNumberResponse = z.infer<
  typeof GetCommunicationUnreadNumberResponseSchema
>;

/** POST /api/communications/:studentId */
export type PostCommunicationResponse = z.infer<typeof PostCommunicationResponseSchema>;

/** GET /api/communications/:studentId/pages/:pageNumber */
export type LoadCommunicationThreadResponse = z.infer<typeof LoadCommunicationThreadResponseSchema>;

/** PUT /api/communications/:communication_id/:communication_messageId */
export type UpdateCommunicationMessageResponse = z.infer<
  typeof UpdateCommunicationMessageResponseSchema
>;

/** DELETE /api/communications/:student_id/:communication_messageId */
export type DeleteCommunicationMessageResponse = z.infer<
  typeof DeleteCommunicationMessageResponseSchema
>;

/** PUT /api/communications/:student_id/:communication_messageId/:ignoreMessageState/ignore */
export type IgnoreCommunicationMessageResponse = z.infer<
  typeof IgnoreCommunicationMessageResponseSchema
>;
