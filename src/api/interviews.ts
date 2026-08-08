import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import {
  InterviewWithIdSchema,
  InterviewSurveyResponseWithIdSchema
} from './serialized';
import { AuditLogEntrySchema } from './audit';

// The list reads (`/`, `/open`, `/my-interviews`, `/interview/:program_id`,
// `/interviews/:student_id`) were consolidated into the single paginated
// endpoint `GET /api/interviews/all/paginated`, which takes `student_id` /
// `program_id` / `isClosed` / `no_trainer` as filters. Their response schemas
// went with them.

// =========== Schemas ===========

export const GetInterviewResponseSchema = z.object({
  success: z.boolean(),
  data: InterviewWithIdSchema.optional(),
  // Built by the same AuditService.getAuditLogs as GET /api/audit, so the
  // refs on each row arrive populated.
  interviewAuditLog: z.array(AuditLogEntrySchema).optional()
});

export const GetInterviewSurveyResponseSchema = createApiResponseSchema(
  InterviewSurveyResponseWithIdSchema
);

export const UpdateInterviewSurveyResponseSchema = createApiResponseSchema(
  InterviewSurveyResponseWithIdSchema
);

export const CreateInterviewResponseSchema = SuccessResponseSchema;

export const DeleteInterviewResponseSchema = SuccessResponseSchema;

export const UpdateInterviewResponseSchema = createApiResponseSchema(InterviewWithIdSchema);

export const AddInterviewTrainingDateTimeResponseSchema = SuccessResponseSchema;

// =========== Inferred types ===========

/**
 * GET /api/interviews/:interview_id
 * Non-standard: also returns interviewAuditLog
 */
export type GetInterviewResponse = z.infer<typeof GetInterviewResponseSchema>;

/** GET /api/interviews/:interview_id/survey */
export type GetInterviewSurveyResponse = z.infer<typeof GetInterviewSurveyResponseSchema>;

/** PUT /api/interviews/:interview_id/survey */
export type UpdateInterviewSurveyResponse = z.infer<typeof UpdateInterviewSurveyResponseSchema>;

/** POST /api/interviews/create/:program_id/:student_id */
export type CreateInterviewResponse = z.infer<typeof CreateInterviewResponseSchema>;

/** DELETE /api/interviews/:interview_id */
export type DeleteInterviewResponse = z.infer<typeof DeleteInterviewResponseSchema>;

/** PUT /api/interviews/:interview_id */
export type UpdateInterviewResponse = z.infer<typeof UpdateInterviewResponseSchema>;

/** POST /api/interviews/time/:interview_id */
export type AddInterviewTrainingDateTimeResponse = z.infer<
  typeof AddInterviewTrainingDateTimeResponseSchema
>;
