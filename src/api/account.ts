import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import {
  StudentResponseSchema,
  UserAcademicBackgroundUniversitySchema,
  UserAcademicBackgroundLanguageSchema,
  UserApplicationPreferenceSchema
} from './serialized';

// =========== Schemas ===========

export const UpdateCredentialsResponseSchema = SuccessResponseSchema;

export const UpdateBannerResponseSchema = SuccessResponseSchema;

export const UpdateAgentBannerResponseSchema = SuccessResponseSchema;

export const PersonalDataSubsetSchema = z.object({
  firstname: z.string().optional(),
  firstname_chinese: z.string().optional(),
  lastname: z.string().optional(),
  lastname_chinese: z.string().optional(),
  birthday: z.string().optional(),
  linkedIn: z.string().optional(),
  lineId: z.string().optional()
});

export const UpdatePersonalDataResponseSchema = createApiResponseSchema(PersonalDataSubsetSchema);

export const UpdateAcademicBackgroundResponseSchema = z.object({
  success: z.boolean(),
  data: UserAcademicBackgroundUniversitySchema.optional(),
  profile: z.unknown().optional()
});

export const UpdateLanguageSkillResponseSchema = z.object({
  success: z.boolean(),
  data: UserAcademicBackgroundLanguageSchema.optional(),
  profile: z.unknown().optional()
});

export const UpdateApplicationPreferenceResponseSchema = createApiResponseSchema(
  UserApplicationPreferenceSchema
);

export const GetMyAcademicBackgroundResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const GetTemplatesResponseSchema = createApiResponseSchema(z.array(z.unknown()));

export const UploadTemplateResponseSchema = SuccessResponseSchema;

export const DeleteTemplateFileResponseSchema = SuccessResponseSchema;

// =========== Inferred types ===========

/** POST /api/account/credentials */
export type UpdateCredentialsResponse = z.infer<typeof UpdateCredentialsResponseSchema>;

/** POST /api/account/student/notifications */
export type UpdateBannerResponse = z.infer<typeof UpdateBannerResponseSchema>;

/** POST /api/account/agent/notifications */
export type UpdateAgentBannerResponse = z.infer<typeof UpdateAgentBannerResponseSchema>;

/** Personal data subset returned after profile update */
export type PersonalDataSubset = z.infer<typeof PersonalDataSubsetSchema>;

/** POST /api/account/profile/:user_id */
export type UpdatePersonalDataResponse = z.infer<typeof UpdatePersonalDataResponseSchema>;

/**
 * POST /api/account/survey/university/:student_id
 * Non-standard: returns data (university obj) + profile side-effect
 */
export type UpdateAcademicBackgroundResponse = z.infer<typeof UpdateAcademicBackgroundResponseSchema>;

/**
 * POST /api/account/survey/language/:student_id
 * Non-standard: returns data (language obj) + profile side-effect
 */
export type UpdateLanguageSkillResponse = z.infer<typeof UpdateLanguageSkillResponseSchema>;

/** POST /api/account/survey/preferences/:student_id */
export type UpdateApplicationPreferenceResponse = z.infer<
  typeof UpdateApplicationPreferenceResponseSchema
>;

/** GET /api/account/survey */
export type GetMyAcademicBackgroundResponse = z.infer<typeof GetMyAcademicBackgroundResponseSchema>;

/** GET /api/account/files/template */
export type GetTemplatesResponse = z.infer<typeof GetTemplatesResponseSchema>;

/** POST /api/account/files/template/:category */
export type UploadTemplateResponse = z.infer<typeof UploadTemplateResponseSchema>;

/** DELETE /api/account/files/template/:category */
export type DeleteTemplateFileResponse = z.infer<typeof DeleteTemplateFileResponseSchema>;
