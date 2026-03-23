import { z } from 'zod';
import { createApiResponseSchema } from './common';
import { DocumentationWithIdSchema, CommunicationWithIdSchema } from './serialized';

// =========== Schemas ===========

export const SearchResultItemSchema = z
  .object({ score: z.number().optional() })
  .catchall(z.unknown());

export const StudentSearchResultSchema = z.object({
  _id: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  firstname_chinese: z.string().optional(),
  lastname_chinese: z.string().optional(),
  role: z.string().optional(),
  email: z.string().optional(),
  score: z.number().optional()
});

export const GetQueryResultsResponseSchema = createApiResponseSchema(
  z.array(SearchResultItemSchema)
);

export const GetQueryPublicResultsResponseSchema = createApiResponseSchema(
  z.array(DocumentationWithIdSchema)
);

export const GetQueryStudentsResultsResponseSchema = createApiResponseSchema(
  z.array(StudentSearchResultSchema)
);

export const GetQueryStudentResultsResponseSchema = createApiResponseSchema(
  z.array(CommunicationWithIdSchema)
);

// =========== Inferred types ===========

/** A mixed search result item (may be a student, doc, program, etc.) */
export type SearchResultItem = z.infer<typeof SearchResultItemSchema>;

/** A student search result with basic identity fields */
export type StudentSearchResult = z.infer<typeof StudentSearchResultSchema>;

/** GET /api/search?q= */
export type GetQueryResultsResponse = z.infer<typeof GetQueryResultsResponseSchema>;

/** GET /api/search/public?q= */
export type GetQueryPublicResultsResponse = z.infer<typeof GetQueryPublicResultsResponseSchema>;

/** GET /api/search/students?q= */
export type GetQueryStudentsResultsResponse = z.infer<typeof GetQueryStudentsResultsResponseSchema>;

/** GET /api/communications?q= (student-side search) */
export type GetQueryStudentResultsResponse = z.infer<typeof GetQueryStudentResultsResponseSchema>;
