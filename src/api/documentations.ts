import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import {
  DocumentationWithIdSchema,
  DocspageWithIdSchema,
  InternaldocWithIdSchema
} from './serialized';

// =========== Schemas ===========

// --- Public Documentation ---

export const GetCategorizedDocumentationResponseSchema = createApiResponseSchema(
  z.array(DocumentationWithIdSchema)
);

export const GetAllDocumentationsResponseSchema = createApiResponseSchema(
  z.array(DocumentationWithIdSchema)
);

export const GetDocumentationResponseSchema = createApiResponseSchema(DocumentationWithIdSchema);

export const CreateDocumentationResponseSchema = createApiResponseSchema(DocumentationWithIdSchema);

export const UpdateDocumentationResponseSchema = createApiResponseSchema(DocumentationWithIdSchema);

export const DeleteDocumentationResponseSchema = SuccessResponseSchema;

// --- Docs Pages ---

export const GetDocspageResponseSchema = createApiResponseSchema(
  z.union([DocspageWithIdSchema, z.record(z.never())])
);

export const UpdateDocspageResponseSchema = createApiResponseSchema(DocspageWithIdSchema);

// --- Internal Documentation ---

export const GetAllInternalDocumentationsResponseSchema = createApiResponseSchema(
  z.array(InternaldocWithIdSchema)
);

export const GetInternaldocResponseSchema = createApiResponseSchema(InternaldocWithIdSchema);

export const GetInternalDocumentationPageResponseSchema = createApiResponseSchema(
  z.union([DocspageWithIdSchema, z.record(z.never())])
);

export const UpdateInternalDocumentationPageResponseSchema = createApiResponseSchema(
  DocspageWithIdSchema
);

export const CreateInternaldocResponseSchema = createApiResponseSchema(InternaldocWithIdSchema);

export const UpdateInternaldocResponseSchema = createApiResponseSchema(InternaldocWithIdSchema);

export const DeleteInternaldocResponseSchema = SuccessResponseSchema;

// --- Image / File Upload ---

export const UploadDocImageResponseSchema = createApiResponseSchema(z.string());

export const UploadDocDocsResponseSchema = z.object({
  success: z.boolean(),
  url: z.string().optional(),
  title: z.string().optional(),
  extension: z.string().optional()
});

// =========== Inferred types ===========

/** GET /api/docs/:category */
export type GetCategorizedDocumentationResponse = z.infer<
  typeof GetCategorizedDocumentationResponseSchema
>;

/** GET /api/docs/all */
export type GetAllDocumentationsResponse = z.infer<typeof GetAllDocumentationsResponseSchema>;

/** GET /api/docs/search/:doc_id */
export type GetDocumentationResponse = z.infer<typeof GetDocumentationResponseSchema>;

/** POST /api/docs */
export type CreateDocumentationResponse = z.infer<typeof CreateDocumentationResponseSchema>;

/** PUT /api/docs/:doc_id */
export type UpdateDocumentationResponse = z.infer<typeof UpdateDocumentationResponseSchema>;

/** DELETE /api/docs/:doc_id */
export type DeleteDocumentationResponse = z.infer<typeof DeleteDocumentationResponseSchema>;

/** GET /api/docs/pages/:category */
export type GetDocspageResponse = z.infer<typeof GetDocspageResponseSchema>;

/** PUT /api/docs/pages/:category */
export type UpdateDocspageResponse = z.infer<typeof UpdateDocspageResponseSchema>;

/** GET /api/docs/internal/all */
export type GetAllInternalDocumentationsResponse = z.infer<
  typeof GetAllInternalDocumentationsResponseSchema
>;

/** GET /api/docs/internal/search/:doc_id */
export type GetInternaldocResponse = z.infer<typeof GetInternaldocResponseSchema>;

/** GET /api/docs/taiger/internal/confidential */
export type GetInternalDocumentationPageResponse = z.infer<
  typeof GetInternalDocumentationPageResponseSchema
>;

/** PUT /api/docs/taiger/internal/confidential */
export type UpdateInternalDocumentationPageResponse = z.infer<
  typeof UpdateInternalDocumentationPageResponseSchema
>;

/** POST /api/docs/internal */
export type CreateInternaldocResponse = z.infer<typeof CreateInternaldocResponseSchema>;

/** PUT /api/docs/internal/:doc_id */
export type UpdateInternaldocResponse = z.infer<typeof UpdateInternaldocResponseSchema>;

/** DELETE /api/docs/internal/:doc_id */
export type DeleteInternaldocResponse = z.infer<typeof DeleteInternaldocResponseSchema>;

/** POST /api/docs/upload/image — returns image URL */
export type UploadDocImageResponse = z.infer<typeof UploadDocImageResponseSchema>;

/**
 * POST /api/docs/upload/docs
 * Non-standard: returns url, title, extension alongside success
 */
export type UploadDocDocsResponse = z.infer<typeof UploadDocDocsResponseSchema>;
