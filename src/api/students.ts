import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import { StudentResponseSchema, BasedocumentationslinkWithIdSchema } from './serialized';

// =========== Schemas ===========

export const GetStudentsResponseSchema = createApiResponseSchema(z.array(StudentResponseSchema));

export const GetActiveStudentsResponseSchema = createApiResponseSchema(
  z.array(StudentResponseSchema)
);

export const GetStudentResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const GetStudentDocLinksResponseSchema = z.object({
  success: z.boolean(),
  data: StudentResponseSchema.optional(),
  basedocumentationlinks: z.array(BasedocumentationslinkWithIdSchema).optional()
});

export const GetStudentsAndDocLinksResponseSchema = createApiResponseSchema(
  z.array(StudentResponseSchema)
);

export const UpdateArchivStudentsResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const UpdateStudentAgentsResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const UpdateStudentEditorsResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const UpdateStudentAttributesResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const UpdateDocumentationHelperLinkResponseSchema = SuccessResponseSchema;

export const UploadStudentFileResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const DeleteStudentFileResponseSchema = SuccessResponseSchema;

export const UploadVPDFileResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const DeleteVPDFileResponseSchema = SuccessResponseSchema;

export const SetAsNotNeededResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const SetUniAssistPaidResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const UpdateProfileDocStatusResponseSchema = createApiResponseSchema(StudentResponseSchema);

export const GetStudentUniAssistResponseSchema = createApiResponseSchema(StudentResponseSchema);

// =========== Inferred types ===========

/** GET /api/students, GET /api/students/v3 */
export type GetStudentsResponse = z.infer<typeof GetStudentsResponseSchema>;

/** GET /api/students/active */
export type GetActiveStudentsResponse = z.infer<typeof GetActiveStudentsResponseSchema>;

/** GET /api/students/:studentId */
export type GetStudentResponse = z.infer<typeof GetStudentResponseSchema>;

/** GET /api/students/doc-links/:studentId */
export type GetStudentDocLinksResponse = z.infer<typeof GetStudentDocLinksResponseSchema>;

/** GET /api/students/doc-links */
export type GetStudentsAndDocLinksResponse = z.infer<typeof GetStudentsAndDocLinksResponseSchema>;

/** POST /api/students/archiv/:studentId */
export type UpdateArchivStudentsResponse = z.infer<typeof UpdateArchivStudentsResponseSchema>;

/** POST /api/students/:studentId/agents */
export type UpdateStudentAgentsResponse = z.infer<typeof UpdateStudentAgentsResponseSchema>;

/** POST /api/students/:studentId/editors */
export type UpdateStudentEditorsResponse = z.infer<typeof UpdateStudentEditorsResponseSchema>;

/** POST /api/students/:studentId/attributes */
export type UpdateStudentAttributesResponse = z.infer<typeof UpdateStudentAttributesResponseSchema>;

/** POST /api/students/doc-links */
export type UpdateDocumentationHelperLinkResponse = z.infer<
  typeof UpdateDocumentationHelperLinkResponseSchema
>;

/** POST /api/students/:studentId/files/:category */
export type UploadStudentFileResponse = z.infer<typeof UploadStudentFileResponseSchema>;

/** DELETE /api/students/:studentId/files/:category */
export type DeleteStudentFileResponse = z.infer<typeof DeleteStudentFileResponseSchema>;

/** POST /api/students/:studentId/vpd/:applicationId/:fileType */
export type UploadVPDFileResponse = z.infer<typeof UploadVPDFileResponseSchema>;

/** DELETE /api/students/:studentId/vpd/:applicationId/:fileType */
export type DeleteVPDFileResponse = z.infer<typeof DeleteVPDFileResponseSchema>;

/** PUT /api/students/:studentId/vpd/:applicationId/VPD */
export type SetAsNotNeededResponse = z.infer<typeof SetAsNotNeededResponseSchema>;

/** POST /api/students/:studentId/vpd/:applicationId/payments */
export type SetUniAssistPaidResponse = z.infer<typeof SetUniAssistPaidResponseSchema>;

/** POST /api/students/:studentId/:category/status */
export type UpdateProfileDocStatusResponse = z.infer<typeof UpdateProfileDocStatusResponseSchema>;

/** GET /api/uniassist/:studentId */
export type GetStudentUniAssistResponse = z.infer<typeof GetStudentUniAssistResponseSchema>;
