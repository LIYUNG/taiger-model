import { z } from 'zod';

import {
  DeleteStudentFileResponseSchema,
  DeleteVPDFileResponseSchema,
  GetStudentDocLinksResponseSchema,
  GetStudentResponseSchema,
  GetStudentsAndDocLinksResponseSchema,
  GetStudentsByIdsResponseSchema,
  GetStudentsResponseSchema,
  GetStudentsV3PaginatedResponseSchema,
  SetAsNotNeededResponseSchema,
  SetUniAssistPaidResponseSchema,
  UpdateArchivStudentsResponseSchema,
  UpdateDocumentationHelperLinkResponseSchema,
  UpdateProfileDocStatusResponseSchema,
  UpdateStudentAgentsResponseSchema,
  UpdateStudentAttributesResponseSchema,
  UpdateStudentEditorsResponseSchema,
  UploadStudentFileResponseSchema,
  UploadVPDFileResponseSchema
} from '../api/students';
import { SuccessResponseSchema } from '../api/common';
import { defineContract } from './types';

/**
 * The student database: the lists the tables page, one student's record, the
 * agent/editor assignments, and the profile and uni-assist files.
 */

const StudentParams = z.object({ studentId: z.string().min(1) });

const VpdParams = z.object({
  studentId: z.string().min(1),
  applicationId: z.string().min(1),
  fileType: z.string().min(1)
});

/** The three list endpoints share the same scoping filters. */
const StudentListQuery = z.object({
  editors: z.string().optional(),
  agents: z.string().optional(),
  archiv: z.string().optional()
});

const PaginatedStudentListQuery = StudentListQuery.extend({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
  /**
   * Include each student's applications (programmes populated) and courses.
   *
   * Opt-in. The hydrate becomes `$unwind` -> `$lookup` programs -> `$group` ->
   * `$replaceRoot` per page, and most callers list students without reading
   * their applications; defaulting it on would bill them for a join they throw
   * away.
   */
  withApplications: z.string().optional(),
  /** Every application submitted and none admitted. */
  atRisk: z.string().optional(),
  /** Has at least one application marked as the final enrolment. */
  hasFinalEnrolment: z.string().optional()
});

export const studentsContract = {
  getStudentsV3: defineContract({
    method: 'get',
    path: '/api/students/v3',
    tags: ['Students'],
    summary: 'Get students',
    query: StudentListQuery,
    response: GetStudentsResponseSchema
  }),

  getStudentsV3Paginated: defineContract({
    method: 'get',
    path: '/api/students/v3/paginated',
    tags: ['Students'],
    summary: 'Get one page of students',
    query: PaginatedStudentListQuery,
    response: GetStudentsV3PaginatedResponseSchema
  }),

  getStudentsByIds: defineContract({
    method: 'get',
    path: '/api/students/batch',
    tags: ['Students'],
    summary: 'Get several students by id',
    query: z.object({
      /** Comma-separated. Non-ObjectId entries are reported, not fatal. */
      ids: z.string().optional()
    }),
    response: GetStudentsByIdsResponseSchema
  }),

  exportActiveStudentApplicationsCsv: defineContract({
    method: 'get',
    path: '/api/students/active/applications/export.csv',
    tags: ['Students'],
    summary: 'Export students and their applications as CSV',
    description:
      'The same rows as `/api/students/active/paginated`, grouped so a ' +
      "student's identity appears once rather than on every application " +
      'line. Takes the same `page` / `limit` as the list: the export is what ' +
      'the user is looking at, so page 2 at 100 per page exports those 100.',
    query: PaginatedStudentListQuery,
    // Streamed as an attachment, so a client fetches it through its blob
    // transport rather than `callApi` (which would try to parse a JSON
    // envelope this route never sends).
    successContentType: 'text/csv',
    response: SuccessResponseSchema
  }),

  updateDocumentationHelperLink: defineContract({
    method: 'post',
    path: '/api/students/doc-links',
    tags: ['Students'],
    summary: 'Set the helper link for a base-documents category',
    body: z.object({
      link: z.string(),
      key: z.string(),
      category: z.string()
    }),
    response: UpdateDocumentationHelperLinkResponseSchema
  }),

  getStudentsAndDocLinks: defineContract({
    method: 'get',
    path: '/api/students/doc-links',
    tags: ['Students'],
    summary: 'Get students with the shared base-documents links',
    query: StudentListQuery,
    response: GetStudentsAndDocLinksResponseSchema
  }),

  getStudentAndDocLinks: defineContract({
    method: 'get',
    path: '/api/students/doc-links/:studentId',
    tags: ['Students'],
    summary: "Get a student's record with their documents and audit trail",
    params: StudentParams,
    response: GetStudentDocLinksResponseSchema
  }),

  updateStudentsArchivStatus: defineContract({
    method: 'post',
    path: '/api/students/archiv/:studentId',
    tags: ['Students'],
    summary: 'Archive or unarchive a student',
    params: StudentParams,
    body: z.object({
      isArchived: z.boolean(),
      shouldInform: z.boolean().optional()
    }),
    response: UpdateArchivStudentsResponseSchema
  }),

  assignAgentToStudent: defineContract({
    method: 'post',
    path: '/api/students/:studentId/agents',
    tags: ['Students'],
    summary: "Set a student's agents",
    params: StudentParams,
    response: UpdateStudentAgentsResponseSchema
  }),

  assignEditorToStudent: defineContract({
    method: 'post',
    path: '/api/students/:studentId/editors',
    tags: ['Students'],
    summary: "Set a student's editors",
    params: StudentParams,
    response: UpdateStudentEditorsResponseSchema
  }),

  assignAttributesToStudent: defineContract({
    method: 'post',
    path: '/api/students/:studentId/attributes',
    tags: ['Students'],
    summary: "Set a student's attributes",
    params: StudentParams,
    response: UpdateStudentAttributesResponseSchema
  }),

  updateVPDPayment: defineContract({
    method: 'post',
    path: '/api/students/:studentId/vpd/:applicationId/payments',
    tags: ['Students'],
    summary: 'Mark a uni-assist VPD as paid',
    params: z.object({
      studentId: z.string().min(1),
      applicationId: z.string().min(1)
    }),
    body: z.object({ isPaid: z.boolean() }),
    response: SetUniAssistPaidResponseSchema
  }),

  updateVPDFileNecessity: defineContract({
    method: 'put',
    path: '/api/students/:studentId/vpd/:applicationId/:fileType',
    tags: ['Students'],
    summary: 'Mark a uni-assist file as needed or not needed',
    params: VpdParams,
    response: SetAsNotNeededResponseSchema
  }),

  downloadVPDFile: defineContract({
    method: 'get',
    path: '/api/students/:studentId/vpd/:applicationId/:fileType',
    tags: ['Students'],
    summary: 'Download a uni-assist file',
    params: VpdParams,
    successContentType: 'application/octet-stream',
    response: z.unknown()
  }),

  uploadVPDFile: defineContract({
    method: 'post',
    path: '/api/students/:studentId/vpd/:applicationId/:fileType',
    tags: ['Students'],
    summary: 'Upload a uni-assist file',
    params: VpdParams,
    successStatus: 201,
    response: UploadVPDFileResponseSchema
  }),

  deleteVPDFile: defineContract({
    method: 'delete',
    path: '/api/students/:studentId/vpd/:applicationId/:fileType',
    tags: ['Students'],
    summary: 'Delete a uni-assist file',
    params: VpdParams,
    response: DeleteVPDFileResponseSchema
  }),

  downloadProfileFile: defineContract({
    method: 'get',
    path: '/api/students/:studentId/files/:file_key',
    tags: ['Students'],
    summary: 'Download a profile document',
    params: z.object({
      studentId: z.string().min(1),
      file_key: z.string().min(1)
    }),
    successContentType: 'application/octet-stream',
    response: z.unknown()
  }),

  uploadProfileFile: defineContract({
    method: 'post',
    path: '/api/students/:studentId/files/:category',
    tags: ['Students'],
    summary: 'Upload a profile document',
    params: z.object({
      studentId: z.string().min(1),
      category: z.string().min(1)
    }),
    successStatus: 201,
    response: UploadStudentFileResponseSchema
  }),

  deleteProfileFile: defineContract({
    method: 'delete',
    path: '/api/students/:studentId/files/:category',
    tags: ['Students'],
    summary: 'Delete a profile document',
    params: z.object({
      studentId: z.string().min(1),
      category: z.string().min(1)
    }),
    response: DeleteStudentFileResponseSchema
  }),

  updateProfileDocumentStatus: defineContract({
    method: 'post',
    path: '/api/students/:studentId/:category/status',
    tags: ['Students'],
    summary: 'Set the status of a profile document',
    params: z.object({
      studentId: z.string().min(1),
      category: z.string().min(1)
    }),
    response: UpdateProfileDocStatusResponseSchema
  }),

  getStudent: defineContract({
    method: 'get',
    path: '/api/students/:studentId',
    tags: ['Students'],
    summary: 'Get a student',
    params: StudentParams,
    response: GetStudentResponseSchema
  })
} as const;
