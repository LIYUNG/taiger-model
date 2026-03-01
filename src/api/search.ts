import type { ApiResponse } from './common';
import type { IDocumentationWithId, ICommunicationWithId } from './serialized';

/** A mixed search result item (may be a student, doc, program, etc.) */
export interface SearchResultItem {
  score?: number;
  [key: string]: unknown;
}

/** A student search result with basic identity fields */
export interface StudentSearchResult {
  _id?: string;
  firstname?: string;
  lastname?: string;
  firstname_chinese?: string;
  lastname_chinese?: string;
  role?: string;
  email?: string;
  score?: number;
}

/** GET /api/search?q= */
export type GetQueryResultsResponse = ApiResponse<SearchResultItem[]>;

/** GET /api/search/public?q= */
export type GetQueryPublicResultsResponse =
  ApiResponse<IDocumentationWithId[]>;

/** GET /api/search/students?q= */
export type GetQueryStudentsResultsResponse =
  ApiResponse<StudentSearchResult[]>;

/** GET /api/communications?q= (student-side search) */
export type GetQueryStudentResultsResponse =
  ApiResponse<ICommunicationWithId[]>;
