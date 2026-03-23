import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import { AllCourseWithIdSchema, KeywordsetWithIdSchema } from './serialized';
import { CourseSchema } from '../schema/models';

// =========== Schemas ===========

// --- All Courses (admin-managed global course catalogue) ---

export const GetAllCoursesResponseSchema = createApiResponseSchema(z.array(AllCourseWithIdSchema));

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

export const GetStudentCoursesResponseSchema = createApiResponseSchema(CourseSchema);

export const UpdateStudentCoursesResponseSchema = createApiResponseSchema(CourseSchema);

// =========== Inferred types ===========

/** GET /api/all-courses */
export type GetAllCoursesResponse = z.infer<typeof GetAllCoursesResponseSchema>;

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

/** GET /api/courses/:student_id */
export type GetStudentCoursesResponse = z.infer<typeof GetStudentCoursesResponseSchema>;

/** PUT /api/courses/:student_id */
export type UpdateStudentCoursesResponse = z.infer<typeof UpdateStudentCoursesResponseSchema>;
