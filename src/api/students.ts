import { z } from 'zod';
import {
  SuccessResponseSchema,
  createApiResponseSchema,
  createNullableApiResponseSchema
} from './common';
import { ApplicationWithIdSchema, StudentResponseSchema } from './serialized';
import { UserProfileItemSchema } from '../schema/models';

// =========== Schemas ===========

export const GetStudentsResponseSchema = createApiResponseSchema(
  z.array(StudentResponseSchema)
);

export const GetStudentResponseSchema = createApiResponseSchema(
  StudentResponseSchema
);

/**
 * `GET /api/students/doc-links/:studentId`.
 *
 * The handler sends `base_docs_link`, `survey_link` and `audit` beside the
 * student. This declared a `basedocumentationlinks` key instead — a name no
 * response has ever carried — and none of the other three.
 */
export const GetStudentDocLinksResponseSchema = createApiResponseSchema(
  StudentResponseSchema
).extend({
  base_docs_link: z.unknown().optional(),
  survey_link: z.unknown().optional(),
  audit: z.unknown().optional()
});

/** `GET /api/students/doc-links` — the list, with the shared links beside it. */
export const GetStudentsAndDocLinksResponseSchema = createApiResponseSchema(
  z.array(StudentResponseSchema)
).extend({
  base_docs_link: z.unknown().optional()
});

/**
 * `POST /api/students/archiv/:studentId` answers with the caller's remaining
 * dashboard students — an array, not the one student this used to declare.
 */
export const UpdateArchivStudentsResponseSchema = createApiResponseSchema(
  z.array(StudentResponseSchema)
);

/** `GET /api/students/v3/paginated` — one page plus the unpaginated count. */
export const GetStudentsV3PaginatedResponseSchema = createApiResponseSchema(
  z.object({
    students: z.array(StudentResponseSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number()
  })
);

/**
 * `GET /api/students/batch`.
 *
 * Ids that are not ObjectIds are skipped rather than failing the request; when
 * any were skipped the response says so.
 */
export const GetStudentsByIdsResponseSchema = createApiResponseSchema(
  z.array(StudentResponseSchema)
).extend({
  invalidIds: z.array(z.string()).optional()
});

export const UpdateStudentAgentsResponseSchema = createApiResponseSchema(
  StudentResponseSchema
);

export const UpdateStudentEditorsResponseSchema = createApiResponseSchema(
  StudentResponseSchema
);

export const UpdateStudentAttributesResponseSchema = createApiResponseSchema(
  StudentResponseSchema
);

/**
 * `POST /api/students/doc-links` answers with the saved link under
 * `helper_link`, not the bare acknowledgement this used to declare.
 */
export const UpdateDocumentationHelperLinkResponseSchema =
  SuccessResponseSchema.extend({
    helper_link: z.unknown().optional()
  });

/**
 * The profile-document endpoints answer with the single `profile` entry they
 * touched, not with the student that owns it. Declaring a whole student here
 * was wrong in the same way for all four of them: every consumer reads
 * `data.status` / `data.path`, which a student does not have.
 */
export const UploadStudentFileResponseSchema = createApiResponseSchema(
  UserProfileItemSchema
);

export const DeleteStudentFileResponseSchema = createApiResponseSchema(
  UserProfileItemSchema
);

export const UpdateProfileDocStatusResponseSchema = createApiResponseSchema(
  UserProfileItemSchema
);

/**
 * The uni-assist endpoints answer with the application they updated — the VPD
 * file, its payment flag and its necessity all live on the application, not on
 * the student.
 */
export const UploadVPDFileResponseSchema = createApiResponseSchema(
  ApplicationWithIdSchema
);

export const DeleteVPDFileResponseSchema = createNullableApiResponseSchema(
  ApplicationWithIdSchema
);

export const SetAsNotNeededResponseSchema = createNullableApiResponseSchema(
  ApplicationWithIdSchema
);

export const SetUniAssistPaidResponseSchema = createNullableApiResponseSchema(
  ApplicationWithIdSchema
);

export const GetStudentUniAssistResponseSchema = createApiResponseSchema(
  StudentResponseSchema
);

// =========== Inferred types ===========

/** GET /api/students/v3/paginated */
export type GetStudentsV3PaginatedResponse = z.infer<
  typeof GetStudentsV3PaginatedResponseSchema
>;

/** GET /api/students/batch */
export type GetStudentsByIdsResponse = z.infer<
  typeof GetStudentsByIdsResponseSchema
>;

/** GET /api/students, GET /api/students/v3 */
export type GetStudentsResponse = z.infer<typeof GetStudentsResponseSchema>;

/** GET /api/students/active */

/** GET /api/students/:studentId */
export type GetStudentResponse = z.infer<typeof GetStudentResponseSchema>;

/** GET /api/students/doc-links/:studentId */
export type GetStudentDocLinksResponse = z.infer<
  typeof GetStudentDocLinksResponseSchema
>;

/** GET /api/students/doc-links */
export type GetStudentsAndDocLinksResponse = z.infer<
  typeof GetStudentsAndDocLinksResponseSchema
>;

/** POST /api/students/archiv/:studentId */
export type UpdateArchivStudentsResponse = z.infer<
  typeof UpdateArchivStudentsResponseSchema
>;

/** POST /api/students/:studentId/agents */
export type UpdateStudentAgentsResponse = z.infer<
  typeof UpdateStudentAgentsResponseSchema
>;

/** POST /api/students/:studentId/editors */
export type UpdateStudentEditorsResponse = z.infer<
  typeof UpdateStudentEditorsResponseSchema
>;

/** POST /api/students/:studentId/attributes */
export type UpdateStudentAttributesResponse = z.infer<
  typeof UpdateStudentAttributesResponseSchema
>;

/** POST /api/students/doc-links */
export type UpdateDocumentationHelperLinkResponse = z.infer<
  typeof UpdateDocumentationHelperLinkResponseSchema
>;

/** POST /api/students/:studentId/files/:category */
export type UploadStudentFileResponse = z.infer<
  typeof UploadStudentFileResponseSchema
>;

/** DELETE /api/students/:studentId/files/:category */
export type DeleteStudentFileResponse = z.infer<
  typeof DeleteStudentFileResponseSchema
>;

/** POST /api/students/:studentId/vpd/:applicationId/:fileType */
export type UploadVPDFileResponse = z.infer<typeof UploadVPDFileResponseSchema>;

/** DELETE /api/students/:studentId/vpd/:applicationId/:fileType */
export type DeleteVPDFileResponse = z.infer<typeof DeleteVPDFileResponseSchema>;

/** PUT /api/students/:studentId/vpd/:applicationId/VPD */
export type SetAsNotNeededResponse = z.infer<
  typeof SetAsNotNeededResponseSchema
>;

/** POST /api/students/:studentId/vpd/:applicationId/payments */
export type SetUniAssistPaidResponse = z.infer<
  typeof SetUniAssistPaidResponseSchema
>;

/** POST /api/students/:studentId/:category/status */
export type UpdateProfileDocStatusResponse = z.infer<
  typeof UpdateProfileDocStatusResponseSchema
>;

/** GET /api/uniassist/:studentId */
export type GetStudentUniAssistResponse = z.infer<
  typeof GetStudentUniAssistResponseSchema
>;
