import { z } from 'zod';

import {
  DeleteStudentCoursesResponseSchema,
  GetStudentCoursesResponseSchema,
  UpdateStudentCoursesResponseSchema
} from '../api/courses';
import {
  AnalyzedFileDownloadResponseSchema,
  TranscriptAnalyserResponseSchema
} from '../api/widgets';
import { defineContract } from './types';

/**
 * A student's own course table and its transcript analysis.
 *
 * Not the course *catalogue* — that is `allCoursesContract` in `catalogue.ts`.
 * These five all hang off one student's record.
 */

const StudentParams = z.object({ studentId: z.string().min(1) });

/**
 * What the course editor writes back.
 *
 * Two call sites send disjoint subsets — the lock toggle sends only
 * `table_data_string_locked`, the save sends the two grids — so every field is
 * optional. Unknown keys are stripped rather than rejected, which is what keeps
 * a read-modify-write round trip working while still holding `_id`, `__v` and
 * `updatedAt` out of the store (the handler stamps `updatedAt` itself).
 */
const UpdateStudentCoursesBodySchema = z.object({
  student_id: z.string().optional(),
  name: z.string().optional(),
  table_data_string: z.string().optional(),
  table_data_string_taiger_guided: z.string().optional(),
  table_data_string_locked: z.boolean().optional()
});

export const coursesContract = {
  /**
   * Declared before the `/:studentId` routes it would otherwise be read as —
   * `transcript` is a literal segment at depth 1 and the router matches in
   * registration order.
   */
  processTranscript: defineContract({
    method: 'post',
    path: '/api/courses/transcript/v2/:studentId/:language',
    tags: ['Courses'],
    summary: "Analyse a student's transcript",
    params: z.object({
      studentId: z.string().min(1),
      language: z.string().min(1)
    }),
    body: z.object({
      requirementIds: z.array(z.string()).optional(),
      factor: z.number().optional()
    }),
    response: TranscriptAnalyserResponseSchema
  }),

  downloadAnalysedTranscript: defineContract({
    method: 'get',
    path: '/api/courses/transcript/v2/:studentId',
    tags: ['Courses'],
    summary: 'Download the analysed transcript json',
    params: StudentParams,
    response: AnalyzedFileDownloadResponseSchema
  }),

  getStudentCourses: defineContract({
    method: 'get',
    path: '/api/courses/:studentId',
    tags: ['Courses'],
    summary: "Get a student's courses",
    params: StudentParams,
    response: GetStudentCoursesResponseSchema
  }),

  updateStudentCourses: defineContract({
    method: 'put',
    path: '/api/courses/:studentId',
    tags: ['Courses'],
    summary: "Update a student's courses",
    params: StudentParams,
    body: UpdateStudentCoursesBodySchema,
    response: UpdateStudentCoursesResponseSchema
  }),

  deleteStudentCourses: defineContract({
    method: 'delete',
    path: '/api/courses/:studentId',
    tags: ['Courses'],
    summary: "Delete a student's course record",
    params: StudentParams,
    response: DeleteStudentCoursesResponseSchema
  })
} as const;
