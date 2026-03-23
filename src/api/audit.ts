import { z } from 'zod';
import { createApiResponseSchema } from './common';
import { AuditWithIdSchema } from './serialized';

// =========== Schemas ===========

export const GetAuditLogResponseSchema = createApiResponseSchema(z.array(AuditWithIdSchema));

// =========== Inferred types ===========

/** GET /api/audit */
export type GetAuditLogResponse = z.infer<typeof GetAuditLogResponseSchema>;
