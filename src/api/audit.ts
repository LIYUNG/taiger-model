import type { ApiResponse } from './common';
import type { IAuditWithId } from './serialized';

/** GET /api/audit */
export type GetAuditLogResponse = ApiResponse<IAuditWithId[]>;
