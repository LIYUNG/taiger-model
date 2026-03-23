import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import {
  ProgramrequirementWithIdSchema,
  ProgramWithIdSchema,
  KeywordsetWithIdSchema
} from './serialized';

// =========== Schemas ===========

export const ProgramsAndKeywordsDataSchema = z.object({
  distinctPrograms: z.array(ProgramWithIdSchema).optional(),
  keywordsets: z.array(KeywordsetWithIdSchema).optional()
});

export const GetProgramRequirementsResponseSchema = createApiResponseSchema(
  z.array(ProgramrequirementWithIdSchema)
);

export const GetProgramRequirementResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      requirement: ProgramrequirementWithIdSchema,
      distinctPrograms: z.array(ProgramWithIdSchema).optional(),
      keywordsets: z.array(KeywordsetWithIdSchema).optional()
    })
    .optional()
});

export const GetProgramsAndKeywordSetsResponseSchema = createApiResponseSchema(
  ProgramsAndKeywordsDataSchema
);

export const CreateProgramRequirementResponseSchema = createApiResponseSchema(
  ProgramrequirementWithIdSchema
);

export const UpdateProgramRequirementResponseSchema = createApiResponseSchema(
  ProgramrequirementWithIdSchema
);

export const DeleteProgramRequirementResponseSchema = SuccessResponseSchema;

// =========== Inferred types ===========

/** Payload returned by GET /api/program-requirements/programs-and-keywords */
export type ProgramsAndKeywordsData = z.infer<typeof ProgramsAndKeywordsDataSchema>;

/** GET /api/program-requirements */
export type GetProgramRequirementsResponse = z.infer<typeof GetProgramRequirementsResponseSchema>;

/**
 * GET /api/program-requirements/:programRequirementId
 * Non-standard: data wraps requirement + supporting lists
 */
export type GetProgramRequirementResponse = z.infer<typeof GetProgramRequirementResponseSchema>;

/** GET /api/program-requirements/programs-and-keywords */
export type GetProgramsAndKeywordSetsResponse = z.infer<
  typeof GetProgramsAndKeywordSetsResponseSchema
>;

/** POST /api/program-requirements/new */
export type CreateProgramRequirementResponse = z.infer<
  typeof CreateProgramRequirementResponseSchema
>;

/** PUT /api/program-requirements/:programRequirementId */
export type UpdateProgramRequirementResponse = z.infer<
  typeof UpdateProgramRequirementResponseSchema
>;

/** DELETE /api/program-requirements/:programRequirementId */
export type DeleteProgramRequirementResponse = z.infer<
  typeof DeleteProgramRequirementResponseSchema
>;
