import { z } from 'zod';
import { createApiResponseSchema } from './common';
import { AuditWithIdSchema } from './serialized';

// =========== Schemas ===========

/**
 * An actor on an audit row: `performedBy` / `targetUserId`.
 *
 * GET /api/audit populates both with `select('firstname lastname role
 * pictureUrl')`, so the wire value is this object — not the id string
 * `AuditSchema` declares. Both Audit pages on the frontend were casting the
 * field to `IUser` to read a name off it.
 */
export const AuditUserRefSchema = z.object({
  _id: z.string(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  role: z.string().optional(),
  pictureUrl: z.string().optional()
});

/** The program summary nested inside a populated thread ref. */
export const AuditProgramRefSchema = z.object({
  _id: z.string(),
  school: z.string().optional(),
  program_name: z.string().optional(),
  degree: z.string().optional(),
  semester: z.string().optional()
});

/**
 * A thread on an audit row: `targetDocumentThreadId` / `interviewThreadId`.
 *
 * Populated with `select('program_id file_type')` and a nested `program_id`
 * populate, so the row carries enough to render a link and a label without a
 * second request.
 */
export const AuditThreadRefSchema = z.object({
  _id: z.string(),
  file_type: z.string().optional(),
  program_id: AuditProgramRefSchema.optional()
});

/**
 * One row of GET /api/audit — the *populated* form.
 *
 * `AuditWithIdSchema` describes the stored document, where the four ref fields
 * are id strings. This endpoint always populates them, so the response type has
 * to say so; otherwise every consumer casts the declared `string` to the object
 * it actually received.
 */
export const AuditLogEntrySchema = AuditWithIdSchema.extend({
  performedBy: AuditUserRefSchema.optional(),
  targetUserId: AuditUserRefSchema.optional(),
  targetDocumentThreadId: AuditThreadRefSchema.optional(),
  interviewThreadId: AuditThreadRefSchema.optional()
});

export const GetAuditLogResponseSchema = createApiResponseSchema(
  z.array(AuditLogEntrySchema)
);

// =========== Inferred types ===========

export type AuditUserRef = z.infer<typeof AuditUserRefSchema>;
export type AuditProgramRef = z.infer<typeof AuditProgramRefSchema>;
export type AuditThreadRef = z.infer<typeof AuditThreadRefSchema>;

/** One populated audit row, as GET /api/audit returns it. */
export type AuditLogEntry = z.infer<typeof AuditLogEntrySchema>;

/** GET /api/audit */
export type GetAuditLogResponse = z.infer<typeof GetAuditLogResponseSchema>;
