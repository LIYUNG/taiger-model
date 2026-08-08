import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import {
  UserAcademicBackgroundUniversitySchema,
  UserAcademicBackgroundLanguageSchema,
  UserApplicationPreferenceSchema
} from './serialized';
import { UserAcademicBackgroundSchema } from '../schema/models';

// =========== Schemas ===========

export const UpdateCredentialsResponseSchema = SuccessResponseSchema;

export const UpdateBannerResponseSchema = SuccessResponseSchema;

export const UpdateAgentBannerResponseSchema = SuccessResponseSchema;

/**
 * What `POST /api/account/profile/:user_id` echoes back.
 *
 * `.nullish()` because these are picked straight off the updated Mongo
 * document, where an optional String path can hold null. `slackId` is sent too
 * and was missing from this list.
 */
export const PersonalDataSubsetSchema = z.object({
  firstname: z.string().nullish(),
  firstname_chinese: z.string().nullish(),
  lastname: z.string().nullish(),
  lastname_chinese: z.string().nullish(),
  birthday: z.string().nullish(),
  linkedIn: z.string().nullish(),
  lineId: z.string().nullish(),
  slackId: z.string().nullish()
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

/**
 * `GET /api/account/survey`.
 *
 * The handler sends four picked fields plus a top-level `survey_link`, not the
 * whole student this used to declare — the survey page reads `data.agents` and
 * `survey_link`, neither of which the old type described.
 */
export const GetMyAcademicBackgroundResponseSchema = createApiResponseSchema(
  z.object({
    agents: z.array(z.unknown()).optional(),
    editors: z.array(z.unknown()).optional(),
    academic_background: UserAcademicBackgroundSchema.optional(),
    application_preference: UserApplicationPreferenceSchema.optional()
  })
).extend({
  survey_link: z.unknown().optional()
});

// --- Reusable CV profile ---
//
// Stored on the student User and shared between the CV thread's "CV Details"
// tab and the student-database survey tab. Both endpoints answer with the same
// picked shape, so one schema covers the read and the write.

export const CvProfilePersonalInformationSchema = z.object({
  nationality: z.string().optional(),
  birthplace: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional()
});

export const CvProfileExperienceSchema = z.object({
  period: z.string().optional(),
  job_title: z.string().optional(),
  company: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  bullets: z.array(z.string()).optional()
});

export const CvProfileAwardSchema = z.object({
  date: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional()
});

export const CvProfileComputerSkillSchema = z.object({
  name: z.string().optional(),
  level: z.string().optional()
});

export const CvProfileSkillsSchema = z.object({
  computer: z.array(CvProfileComputerSkillSchema).optional(),
  other: z.array(z.string()).optional()
});

export const CvProfileInterestsSchema = z.object({
  hobbies: z.string().optional(),
  social_engagement: z.string().optional(),
  competitive_sports: z.string().optional()
});

export const CvProfileDataSchema = z.object({
  personal_information: CvProfilePersonalInformationSchema,
  professional_experience: z.array(CvProfileExperienceSchema),
  awards: z.array(CvProfileAwardSchema),
  skills: CvProfileSkillsSchema,
  interests: CvProfileInterestsSchema
});

export const CvProfileResponseSchema =
  createApiResponseSchema(CvProfileDataSchema);

export const GetTemplatesResponseSchema = createApiResponseSchema(z.array(z.unknown()));

/**
 * Upload and delete both answer with the templates, not a bare acknowledgement
 * — the admin page repaints its list straight from the response, so declaring
 * `SuccessResponseSchema` described a payload nobody was actually sending.
 */
export const UploadTemplateResponseSchema = createApiResponseSchema(z.unknown());

export const DeleteTemplateFileResponseSchema = createApiResponseSchema(
  z.array(z.unknown())
);

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

export type CvProfilePersonalInformation = z.infer<typeof CvProfilePersonalInformationSchema>;
export type CvProfileExperience = z.infer<typeof CvProfileExperienceSchema>;
export type CvProfileAward = z.infer<typeof CvProfileAwardSchema>;
export type CvProfileComputerSkill = z.infer<typeof CvProfileComputerSkillSchema>;
export type CvProfileSkills = z.infer<typeof CvProfileSkillsSchema>;
export type CvProfileInterests = z.infer<typeof CvProfileInterestsSchema>;

/** The reusable CV profile stored on a student. */
export type CvProfileData = z.infer<typeof CvProfileDataSchema>;

/** GET and POST /api/account/survey/cv-profile/:studentId */
export type CvProfileResponse = z.infer<typeof CvProfileResponseSchema>;
