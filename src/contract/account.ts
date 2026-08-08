import { z } from 'zod';

import {
  CvProfileDataSchema,
  CvProfileResponseSchema,
  DeleteTemplateFileResponseSchema,
  GetMyAcademicBackgroundResponseSchema,
  GetTemplatesResponseSchema,
  UpdateAcademicBackgroundResponseSchema,
  UpdateApplicationPreferenceResponseSchema,
  UpdateCredentialsResponseSchema,
  UpdateLanguageSkillResponseSchema,
  UpdatePersonalDataResponseSchema,
  UploadTemplateResponseSchema
} from '../api/account';
import { UpdateStudentApplicationResultResponseSchema } from '../api/applications';
import { UpdateOfficehoursResponseSchema } from '../api/events';
import { defineContract } from './types';

/**
 * A user's own account: the survey, the CV profile, credentials, office hours,
 * the admission-result uploads and the shared document templates.
 */

const StudentParams = z.object({ studentId: z.string().min(1) });
const CategoryParams = z.object({ category_name: z.string().min(1) });

export const accountContract = {
  getTemplates: defineContract({
    method: 'get',
    path: '/api/account/files/template',
    tags: ['Account'],
    summary: 'Get the document templates',
    // 201 on a read is wrong but long-standing; documented as it is rather
    // than changed under clients that may check the status.
    successStatus: 201,
    response: GetTemplatesResponseSchema
  }),

  uploadTemplate: defineContract({
    method: 'post',
    path: '/api/account/files/template/:category_name',
    tags: ['Account'],
    summary: 'Upload a document template',
    params: CategoryParams,
    successStatus: 201,
    response: UploadTemplateResponseSchema
  }),

  deleteTemplate: defineContract({
    method: 'delete',
    path: '/api/account/files/template/:category_name',
    tags: ['Account'],
    summary: 'Delete a document template',
    params: CategoryParams,
    response: DeleteTemplateFileResponseSchema
  }),

  downloadTemplate: defineContract({
    method: 'get',
    path: '/api/account/files/template/:category_name',
    tags: ['Account'],
    summary: 'Download a document template',
    params: CategoryParams,
    // Streams the stored file; the response is bytes, not JSON.
    successContentType: 'application/octet-stream',
    response: z.unknown()
  }),

  updateApplicationResultV2: defineContract({
    method: 'post',
    path: '/api/account/applications/result/v2/:studentId/:programId/:admission',
    tags: ['Account'],
    summary: 'Record an admission result and its letter (by program)',
    params: z.object({
      studentId: z.string().min(1),
      programId: z.string().min(1),
      admission: z.string().min(1)
    }),
    response: UpdateStudentApplicationResultResponseSchema
  }),

  updateApplicationResult: defineContract({
    method: 'post',
    path: '/api/account/applications/result/:studentId/:applicationId/:programId/:result',
    tags: ['Account'],
    summary: 'Record an admission result and its letter',
    params: z.object({
      studentId: z.string().min(1),
      applicationId: z.string().min(1),
      programId: z.string().min(1),
      result: z.string().min(1)
    }),
    response: UpdateStudentApplicationResultResponseSchema
  }),

  getMyAcademicBackground: defineContract({
    method: 'get',
    path: '/api/account/survey',
    tags: ['Account'],
    summary: "Get the signed-in student's survey data",
    response: GetMyAcademicBackgroundResponseSchema
  }),

  updateAcademicBackground: defineContract({
    method: 'post',
    path: '/api/account/survey/university/:studentId',
    tags: ['Account'],
    summary: "Update a student's university background",
    params: StudentParams,
    response: UpdateAcademicBackgroundResponseSchema
  }),

  updateLanguageSkill: defineContract({
    method: 'post',
    path: '/api/account/survey/language/:studentId',
    tags: ['Account'],
    summary: "Update a student's language certificates",
    params: StudentParams,
    response: UpdateLanguageSkillResponseSchema
  }),

  getCvProfile: defineContract({
    method: 'get',
    path: '/api/account/survey/cv-profile/:studentId',
    tags: ['Account'],
    summary: "Get a student's reusable CV profile",
    params: StudentParams,
    response: CvProfileResponseSchema
  }),

  updateCvProfile: defineContract({
    method: 'post',
    path: '/api/account/survey/cv-profile/:studentId',
    tags: ['Account'],
    summary: "Update a student's reusable CV profile",
    params: StudentParams,
    // Partial: the CV Details tab saves one section at a time, and the handler
    // writes only the keys that are present.
    body: CvProfileDataSchema.partial(),
    response: CvProfileResponseSchema
  }),

  updateApplicationPreference: defineContract({
    method: 'post',
    path: '/api/account/survey/preferences/:studentId',
    tags: ['Account'],
    summary: "Update a student's application preferences",
    params: StudentParams,
    response: UpdateApplicationPreferenceResponseSchema
  }),

  updateOfficehours: defineContract({
    method: 'put',
    path: '/api/account/profile/officehours/:user_id',
    tags: ['Account'],
    summary: "Update a staff member's office hours",
    params: z.object({ user_id: z.string().min(1) }),
    response: UpdateOfficehoursResponseSchema
  }),

  updatePersonalData: defineContract({
    method: 'post',
    path: '/api/account/profile/:user_id',
    tags: ['Account'],
    summary: 'Update personal data',
    params: z.object({ user_id: z.string().min(1) }),
    response: UpdatePersonalDataResponseSchema
  }),

  updateCredentials: defineContract({
    method: 'post',
    path: '/api/account/credentials',
    tags: ['Account'],
    summary: 'Change the signed-in user password',
    response: UpdateCredentialsResponseSchema
  })
} as const;
