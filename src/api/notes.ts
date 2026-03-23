import { z } from 'zod';
import { createApiResponseSchema } from './common';
import { NoteWithIdSchema } from './serialized';

// =========== Schemas ===========

export const GetStudentNotesResponseSchema = createApiResponseSchema(NoteWithIdSchema);

export const UpdateStudentNotesResponseSchema = createApiResponseSchema(NoteWithIdSchema);

// =========== Inferred types ===========

/** GET /api/notes/:student_id */
export type GetStudentNotesResponse = z.infer<typeof GetStudentNotesResponseSchema>;

/** PUT /api/notes/:student_id */
export type UpdateStudentNotesResponse = z.infer<typeof UpdateStudentNotesResponseSchema>;
