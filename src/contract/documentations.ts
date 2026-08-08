import { z } from 'zod';

import {
  CreateDocumentationResponseSchema,
  CreateInternaldocResponseSchema,
  DeleteDocumentationResponseSchema,
  DeleteInternaldocResponseSchema,
  GetAllDocumentationsResponseSchema,
  GetAllInternalDocumentationsResponseSchema,
  GetDocspageResponseSchema,
  GetDocumentationResponseSchema,
  GetInternalDocumentationPageResponseSchema,
  GetInternaldocResponseSchema,
  UpdateDocspageResponseSchema,
  UpdateDocumentationResponseSchema,
  UpdateInternalDocumentationPageResponseSchema,
  UpdateInternaldocResponseSchema,
  UploadDocDocsResponseSchema,
  UploadDocImageResponseSchema
} from '../api/documentations';
import { defineContract } from './types';

/**
 * The documentation site: public pages, internal pages, and the files an editor
 * uploads into them.
 *
 * The router is mounted at `/api/docs`, so every path below starts there.
 */

const IdParams = z.object({ id: z.string().min(1) });
const DocIdParams = z.object({ doc_id: z.string().min(1) });

export const documentationsContract = {
  createDocumentation: defineContract({
    method: 'post',
    path: '/api/docs',
    tags: ['Documentations'],
    summary: 'Create a documentation article',
    response: CreateDocumentationResponseSchema
  }),

  createInternalDocumentation: defineContract({
    method: 'post',
    path: '/api/docs/internal',
    tags: ['Documentations'],
    summary: 'Create an internal documentation article',
    response: CreateInternaldocResponseSchema
  }),

  getAllInternalDocumentations: defineContract({
    method: 'get',
    path: '/api/docs/internal/all',
    tags: ['Documentations'],
    summary: 'Get every internal documentation article',
    response: GetAllInternalDocumentationsResponseSchema
  }),

  getInternalDocumentation: defineContract({
    method: 'get',
    path: '/api/docs/internal/search/:doc_id',
    tags: ['Documentations'],
    summary: 'Get an internal documentation article',
    params: DocIdParams,
    response: GetInternaldocResponseSchema
  }),

  updateInternalDocumentation: defineContract({
    method: 'put',
    path: '/api/docs/internal/:id',
    tags: ['Documentations'],
    summary: 'Update an internal documentation article',
    params: IdParams,
    successStatus: 201,
    response: UpdateInternaldocResponseSchema
  }),

  deleteInternalDocumentation: defineContract({
    method: 'delete',
    path: '/api/docs/internal/:id',
    tags: ['Documentations'],
    summary: 'Delete an internal documentation article',
    params: IdParams,
    response: DeleteInternaldocResponseSchema
  }),

  getInternalDocumentationPage: defineContract({
    method: 'get',
    path: '/api/docs/taiger/internal/confidential',
    tags: ['Documentations'],
    summary: 'Get the internal documentation landing page',
    response: GetInternalDocumentationPageResponseSchema
  }),

  updateInternalDocumentationPage: defineContract({
    method: 'put',
    path: '/api/docs/taiger/internal/confidential',
    tags: ['Documentations'],
    summary: 'Update the internal documentation landing page',
    successStatus: 201,
    response: UpdateInternalDocumentationPageResponseSchema
  }),

  uploadDocImage: defineContract({
    method: 'post',
    path: '/api/docs/upload/image',
    tags: ['Documentations'],
    summary: 'Upload an image for a documentation article',
    response: UploadDocImageResponseSchema
  }),

  uploadDocDocs: defineContract({
    method: 'post',
    path: '/api/docs/upload/docs',
    tags: ['Documentations'],
    summary: 'Upload a file for a documentation article',
    response: UploadDocDocsResponseSchema
  }),

  getDocFile: defineContract({
    method: 'get',
    path: '/api/docs/file/:object_key',
    tags: ['Documentations'],
    summary: 'Download a documentation file',
    params: z.object({ object_key: z.string().min(1) }),
    // Streams the stored object; the body is bytes, not JSON.
    successContentType: 'application/octet-stream',
    response: z.unknown()
  }),

  getCategoryDocumentationPage: defineContract({
    method: 'get',
    path: '/api/docs/pages/:category',
    tags: ['Documentations'],
    summary: 'Get a documentation category page',
    params: z.object({ category: z.string().min(1) }),
    response: GetDocspageResponseSchema
  }),

  updateDocumentationPage: defineContract({
    method: 'put',
    path: '/api/docs/pages/:category',
    tags: ['Documentations'],
    summary: 'Update a documentation category page',
    params: z.object({ category: z.string().min(1) }),
    successStatus: 201,
    response: UpdateDocspageResponseSchema
  }),

  getAllDocumentations: defineContract({
    method: 'get',
    path: '/api/docs/all',
    tags: ['Documentations'],
    summary: 'Get every documentation article',
    response: GetAllDocumentationsResponseSchema
  }),

  getDocumentation: defineContract({
    method: 'get',
    path: '/api/docs/search/:doc_id',
    tags: ['Documentations'],
    summary: 'Get a documentation article',
    params: DocIdParams,
    response: GetDocumentationResponseSchema
  }),

  updateDocumentation: defineContract({
    method: 'put',
    path: '/api/docs/:id',
    tags: ['Documentations'],
    summary: 'Update a documentation article',
    params: IdParams,
    successStatus: 201,
    response: UpdateDocumentationResponseSchema
  }),

  deleteDocumentation: defineContract({
    method: 'delete',
    path: '/api/docs/:id',
    tags: ['Documentations'],
    summary: 'Delete a documentation article',
    params: IdParams,
    response: DeleteDocumentationResponseSchema
  })
} as const;
