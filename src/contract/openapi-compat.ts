import { z } from 'zod';

/**
 * Marker for schemas an OpenAPI generator cannot introspect.
 *
 * `StudentResponseSchema` and `ApplicationPopulatedSchema` are mutually
 * recursive (a student carries applications, each application carries its
 * student), so they are built with `z.lazy()` and a generator has nothing to
 * unwrap — it fails with `UnknownZodTypeError`.
 *
 * The tag is a plain property rather than a `.openapi()` call: this package is
 * consumed by clients that have no reason to install an OpenAPI generator, and
 * importing one here would put it in their bundle. The mounting service reads
 * the tag and applies the annotation with its own copy of the library.
 */
export const OPENAPI_OBJECT_TAG = '__openapiObjectTitle';

export const asOpenApiObject = <T extends z.ZodTypeAny>(
  schema: T,
  title: string
): T => {
  Object.defineProperty(schema, OPENAPI_OBJECT_TAG, {
    value: title,
    enumerable: false,
    configurable: true
  });
  return schema;
};

/** The title a schema was tagged with, if any. */
export const openApiObjectTitle = (schema: unknown): string | undefined =>
  (schema as Record<string, unknown> | null)?.[OPENAPI_OBJECT_TAG] as
    | string
    | undefined;
