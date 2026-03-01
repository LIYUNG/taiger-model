import type { ApiResponse } from './common';
import type { INoteWithId } from './serialized';

/** GET /api/notes/:student_id */
export type GetStudentNotesResponse = ApiResponse<INoteWithId>;

/** PUT /api/notes/:student_id */
export type UpdateStudentNotesResponse = ApiResponse<INoteWithId>;
