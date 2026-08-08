import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import { AllCourseWithIdSchema, KeywordsetWithIdSchema } from './serialized';
import {
  CourseSchema,
  UserAcademicBackgroundSchema,
  UserApplicationPreferenceSchema
} from '../schema/models';

// =========== Schemas ===========

// --- All Courses (admin-managed global course catalogue) ---

/**
 * `GET /api/all-courses/paginated`. The unpaginated `GET /api/all-courses`
 * was removed: the catalogue grows with every course anyone records, so the
 * browser was being handed a table that only ever gets bigger.
 */
export const GetAllCoursesPaginatedResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    courses: z.array(AllCourseWithIdSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number()
  })
});

export const GetAllCourseResponseSchema = createApiResponseSchema(AllCourseWithIdSchema);

export const CreateAllCourseResponseSchema = createApiResponseSchema(AllCourseWithIdSchema);

export const UpdateAllCourseResponseSchema = createApiResponseSchema(AllCourseWithIdSchema);

export const DeleteAllCourseResponseSchema = SuccessResponseSchema;

// --- Course Keyword Sets ---

export const GetCourseKeywordsetsResponseSchema = createApiResponseSchema(
  z.array(KeywordsetWithIdSchema)
);

export const GetCourseKeywordsetResponseSchema = createApiResponseSchema(KeywordsetWithIdSchema);

export const CreateKeywordsetResponseSchema = createApiResponseSchema(KeywordsetWithIdSchema);

export const UpdateKeywordsetResponseSchema = createApiResponseSchema(KeywordsetWithIdSchema);

export const DeleteKeywordsetResponseSchema = SuccessResponseSchema;

// --- Student Courses ---

/**
 * The student a course record belongs to, as the course reads return it.
 *
 * `CourseSchema.student_id` describes the *stored* document, where it is an id
 * string. Both reads populate it — `getCourse` with the field list below, the
 * upsert with a narrower one — so the wire value is this object. MyCourses was
 * casting the declared `string` to `IUserWithId` to read a name off it.
 *
 * `agents` / `editors` appear only on the seeded-example record `getMycourses`
 * sends when a student has no course row yet.
 */
export const CourseStudentRefSchema = z.object({
  _id: z.string(),
  // `.nullish()` rather than the `.optional()` the other user refs use: the
  // seeded-example branch copies these two straight off a lean Student
  // document, where `firstname` is an optional Mongo String path and can hold
  // null. The other refs come out of a DAO that has already declared its
  // domain shape, so the null never reaches them. Whether that widening should
  // apply to every user ref in this package is a separate question — it is
  // stated here only where an endpoint demonstrably passes the raw value on.
  firstname: z.string().nullish(),
  lastname: z.string().nullish(),
  firstname_chinese: z.string().optional(),
  lastname_chinese: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
  pictureUrl: z.string().optional(),
  archiv: z.boolean().optional(),
  academic_background: UserAcademicBackgroundSchema.optional(),
  application_preference: UserApplicationPreferenceSchema.optional(),
  agents: z.array(z.unknown()).optional(),
  editors: z.array(z.unknown()).optional()
});

/** A student's course row as the API returns it: populated, and carrying `_id`. */
export const StudentCourseRecordSchema = CourseSchema.omit({
  student_id: true
}).extend({
  _id: z.string().optional(),
  student_id: CourseStudentRefSchema.optional()
});

export const GetStudentCoursesResponseSchema = createApiResponseSchema(
  StudentCourseRecordSchema
);

export const UpdateStudentCoursesResponseSchema = createApiResponseSchema(
  StudentCourseRecordSchema
);

export const DeleteStudentCoursesResponseSchema = SuccessResponseSchema;

// =========== Inferred types ===========

/** GET /api/all-courses/paginated */
export type GetAllCoursesPaginatedResponse = z.infer<
  typeof GetAllCoursesPaginatedResponseSchema
>;

/** One row of the course catalogue, as the API returns it. */
export type AllCourseListItem = GetAllCoursesPaginatedResponse['data']['courses'][number];

/** GET /api/all-courses/:courseId */
export type GetAllCourseResponse = z.infer<typeof GetAllCourseResponseSchema>;

/** POST /api/all-courses */
export type CreateAllCourseResponse = z.infer<typeof CreateAllCourseResponseSchema>;

/** PUT /api/all-courses/:courseId */
export type UpdateAllCourseResponse = z.infer<typeof UpdateAllCourseResponseSchema>;

/** DELETE /api/all-courses/:courseId */
export type DeleteAllCourseResponse = z.infer<typeof DeleteAllCourseResponseSchema>;

/** GET /api/course-keywords */
export type GetCourseKeywordsetsResponse = z.infer<typeof GetCourseKeywordsetsResponseSchema>;

/** GET /api/course-keywords/:keywordsSetId */
export type GetCourseKeywordsetResponse = z.infer<typeof GetCourseKeywordsetResponseSchema>;

/** POST /api/course-keywords/new */
export type CreateKeywordsetResponse = z.infer<typeof CreateKeywordsetResponseSchema>;

/** PUT /api/course-keywords/:keywordsSetId */
export type UpdateKeywordsetResponse = z.infer<typeof UpdateKeywordsetResponseSchema>;

/** DELETE /api/course-keywords/:keywordsSetId */
export type DeleteKeywordsetResponse = z.infer<typeof DeleteKeywordsetResponseSchema>;

/** The populated student on a course record. */
export type CourseStudentRef = z.infer<typeof CourseStudentRefSchema>;

/** A student's course row, populated, as the API returns it. */
export type StudentCourseRecord = z.infer<typeof StudentCourseRecordSchema>;

/** GET /api/courses/:studentId */
export type GetStudentCoursesResponse = z.infer<typeof GetStudentCoursesResponseSchema>;

/** PUT /api/courses/:studentId */
export type UpdateStudentCoursesResponse = z.infer<typeof UpdateStudentCoursesResponseSchema>;

/** DELETE /api/courses/:studentId */
export type DeleteStudentCoursesResponse = z.infer<typeof DeleteStudentCoursesResponseSchema>;
