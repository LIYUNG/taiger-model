import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import {
  InterviewWithIdSchema,
  InterviewSurveyResponseWithIdSchema,
  StudentResponseSchema,
  AuditWithIdSchema
} from './serialized';

// =========== Schemas ===========

export const GetInterviewsResponseSchema = createApiResponseSchema(z.array(InterviewWithIdSchema));

export const GetInterviewResponseSchema = z.object({
  success: z.boolean(),
  data: InterviewWithIdSchema.optional(),
  interviewAuditLog: z.array(AuditWithIdSchema).optional()
});

export const GetMyInterviewsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(InterviewWithIdSchema).optional(),
  students: z.array(StudentResponseSchema).optional(),
  student: StudentResponseSchema.optional()
});

export const GetInterviewsByProgramIdResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(InterviewWithIdSchema).optional(),
  count: z.number().optional()
});

export const GetInterviewsByStudentIdResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(InterviewWithIdSchema).optional(),
  count: z.number().optional()
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

/** GET /api/interviews, GET /api/interviews/open */
export type GetInterviewsResponse = z.infer<typeof GetInterviewsResponseSchema>;

/**
 * GET /api/interviews/:interview_id
 * Non-standard: also returns interviewAuditLog
 */
export type GetInterviewResponse = z.infer<typeof GetInterviewResponseSchema>;

/**
 * GET /api/interviews/my-interviews
 * Non-standard: returns students or student alongside data
 */
export type GetMyInterviewsResponse = z.infer<typeof GetMyInterviewsResponseSchema>;

/** GET /api/interviews/interview/:program_id */
export type GetInterviewsByProgramIdResponse = z.infer<typeof GetInterviewsByProgramIdResponseSchema>;

/** GET /api/interviews/interviews/:student_id */
export type GetInterviewsByStudentIdResponse = z.infer<typeof GetInterviewsByStudentIdResponseSchema>;

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
