import { z } from 'zod';

import { GetAuditLogResponseSchema } from '../api/audit';
import { defineContract, positiveIntParam } from './types';

/**
 * `sortBy` is an enum, not a free string: it names a field that reaches a Mongo
 * sort, so the accepted values are the ones the endpoint chooses to offer.
 */
export const AuditQuerySchema = z.object({
  page: positiveIntParam.optional(),
  limit: positiveIntParam.pipe(z.number().max(100)).optional(),
  sortBy: z.enum(['createdAt', 'action', 'field']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});

export const auditContract = {
  getAuditLogs: defineContract({
    method: 'get',
    path: '/api/audit',
    tags: ['Audit'],
    summary: 'Get audit logs',
    description: 'Paginated audit trail, newest first by default.',
    query: AuditQuerySchema,
    response: GetAuditLogResponseSchema
  })
} as const;
