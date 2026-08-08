import { z } from 'zod';

import {
  GetStudentNotesResponseSchema,
  UpdateStudentNotesResponseSchema
} from '../api/notes';
import { defineContract } from './types';

export const StudentNotesParamsSchema = z.object({
  student_id: z.string().min(1)
});

/**
 * Only `notes` is writable.
 *
 * The handler used to spread the whole body into the upsert, so any field a
 * caller invented was written to the document. Stating the writable surface
 * here means both sides agree on it, and the server rejects the rest.
 */
export const UpdateNotesBodySchema = z.object({
  notes: z.string()
});

export const notesContract = {
  getStudentNotes: defineContract({
    method: 'get',
    path: '/api/notes/:student_id',
    tags: ['Notes'],
    summary: 'Get a student notes',
    description:
      'Returns null when the student has no notes yet — a normal result, not a 404.',
    params: StudentNotesParamsSchema,
    response: GetStudentNotesResponseSchema
  }),

  updateStudentNotes: defineContract({
    method: 'put',
    path: '/api/notes/:student_id',
    tags: ['Notes'],
    summary: 'Create or update a student notes',
    params: StudentNotesParamsSchema,
    body: UpdateNotesBodySchema,
    response: UpdateStudentNotesResponseSchema
  })
} as const;
