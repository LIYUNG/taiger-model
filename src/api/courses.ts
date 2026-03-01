import type { ApiResponse, SuccessResponse } from './common';
import type { IAllCourseWithId, IKeywordsetWithId } from './serialized';
import type { ICourse } from '../model/Course';

// --- All Courses (admin-managed global course catalogue) ---

/** GET /api/all-courses */
export type GetAllCoursesResponse = ApiResponse<IAllCourseWithId[]>;

/** GET /api/all-courses/:courseId */
export type GetAllCourseResponse = ApiResponse<IAllCourseWithId>;

/** POST /api/all-courses */
export type CreateAllCourseResponse = ApiResponse<IAllCourseWithId>;

/** PUT /api/all-courses/:courseId */
export type UpdateAllCourseResponse = ApiResponse<IAllCourseWithId>;

/** DELETE /api/all-courses/:courseId */
export type DeleteAllCourseResponse = SuccessResponse;

// --- Course Keyword Sets ---

/** GET /api/course-keywords */
export type GetCourseKeywordsetsResponse = ApiResponse<IKeywordsetWithId[]>;

/** GET /api/course-keywords/:keywordsSetId */
export type GetCourseKeywordsetResponse = ApiResponse<IKeywordsetWithId>;

/** POST /api/course-keywords/new */
export type CreateKeywordsetResponse = ApiResponse<IKeywordsetWithId>;

/** PUT /api/course-keywords/:keywordsSetId */
export type UpdateKeywordsetResponse = ApiResponse<IKeywordsetWithId>;

/** DELETE /api/course-keywords/:keywordsSetId */
export type DeleteKeywordsetResponse = SuccessResponse;

// --- Student Courses ---

/** GET /api/courses/:student_id */
export type GetStudentCoursesResponse = ApiResponse<ICourse>;

/** PUT /api/courses/:student_id */
export type UpdateStudentCoursesResponse = ApiResponse<ICourse>;
