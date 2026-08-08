import { z } from 'zod';
import {
  createApiResponseSchema,
  createNullableApiResponseSchema
} from './common';
import { NoteWithIdSchema } from './serialized';

// =========== Schemas ===========

/**
 * A student with no notes yet has no record, and that is a normal 200 rather
 * than a 404 — so this response really can carry `"data": null`.
 */
export const GetStudentNotesResponseSchema =
  createNullableApiResponseSchema(NoteWithIdSchema);

/** The upsert always yields a note, so `data` is never empty here. */
export const UpdateStudentNotesResponseSchema =
  createApiResponseSchema(NoteWithIdSchema);

// =========== Inferred types ===========

/** GET /api/notes/:student_id */
export type GetStudentNotesResponse = z.infer<
  typeof GetStudentNotesResponseSchema
>;

/** PUT /api/notes/:student_id */
export type UpdateStudentNotesResponse = z.infer<
  typeof UpdateStudentNotesResponseSchema
>;
