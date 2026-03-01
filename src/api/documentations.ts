import type { ApiResponse, SuccessResponse } from './common';
import type {
  IDocumentationWithId,
  IDocspageWithId,
  IInternaldocWithId
} from './serialized';

// --- Public Documentation ---

/** GET /api/docs/:category */
export type GetCategorizedDocumentationResponse =
  ApiResponse<IDocumentationWithId[]>;

/** GET /api/docs/all */
export type GetAllDocumentationsResponse = ApiResponse<IDocumentationWithId[]>;

/** GET /api/docs/search/:doc_id */
export type GetDocumentationResponse = ApiResponse<IDocumentationWithId>;

/** POST /api/docs */
export type CreateDocumentationResponse = ApiResponse<IDocumentationWithId>;

/** PUT /api/docs/:doc_id */
export type UpdateDocumentationResponse = ApiResponse<IDocumentationWithId>;

/** DELETE /api/docs/:doc_id */
export type DeleteDocumentationResponse = SuccessResponse;

// --- Docs Pages ---

/** GET /api/docs/pages/:category */
export type GetDocspageResponse = ApiResponse<
  IDocspageWithId | Record<string, never>
>;

/** PUT /api/docs/pages/:category */
export type UpdateDocspageResponse = ApiResponse<IDocspageWithId>;

// --- Internal Documentation ---

/** GET /api/docs/internal/all */
export type GetAllInternalDocumentationsResponse =
  ApiResponse<IInternaldocWithId[]>;

/** GET /api/docs/internal/search/:doc_id */
export type GetInternaldocResponse = ApiResponse<IInternaldocWithId>;

/** GET /api/docs/taiger/internal/confidential */
export type GetInternalDocumentationPageResponse = ApiResponse<
  IDocspageWithId | Record<string, never>
>;

/** PUT /api/docs/taiger/internal/confidential */
export type UpdateInternalDocumentationPageResponse =
  ApiResponse<IDocspageWithId>;

/** POST /api/docs/internal */
export type CreateInternaldocResponse = ApiResponse<IInternaldocWithId>;

/** PUT /api/docs/internal/:doc_id */
export type UpdateInternaldocResponse = ApiResponse<IInternaldocWithId>;

/** DELETE /api/docs/internal/:doc_id */
export type DeleteInternaldocResponse = SuccessResponse;

// --- Image / File Upload ---

/** POST /api/docs/upload/image — returns image URL */
export type UploadDocImageResponse = ApiResponse<string>;

/**
 * POST /api/docs/upload/docs
 * Non-standard: returns url, title, extension alongside success
 */
export interface UploadDocDocsResponse {
  success: boolean;
  url?: string;
  title?: string;
  extension?: string;
}
