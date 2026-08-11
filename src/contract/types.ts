import { z } from 'zod';

/**
 * Contract-first API definitions, shared by every service and client.
 *
 * One definition per endpoint, owned here rather than restated on each side.
 * Before this, the pairing of `method + path` to its request and response
 * shapes existed only as convention: the backend expressed it through routing,
 * and the frontend re-stated it by hand in 240 api functions with nothing
 * checking the two agreed. That is how a deleted endpoint kept compiling in the
 * frontend, and how `/api/audit` came to be documented as returning id strings
 * while it sent populated objects.
 *
 * Deliberately transport-agnostic: no express, no axios, no HTTP client. A
 * contract is data, so a server can mount it, a client can call it, and a
 * generator can document it — without any of them depending on the others.
 */

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface RouteContract<
  Params extends z.ZodTypeAny = z.ZodTypeAny,
  Query extends z.ZodTypeAny = z.ZodTypeAny,
  Body extends z.ZodTypeAny = z.ZodTypeAny,
  Response extends z.ZodTypeAny = z.ZodTypeAny
> {
  method: HttpMethod;
  /** Full path in Express form, params as `:name` — e.g. `/api/notes/:student_id`. */
  path: string;
  /** OpenAPI grouping. */
  tags: string[];
  summary: string;
  description?: string;
  /** Path params. Required whenever `path` contains a `:param`. */
  params?: Params;
  /** Query string. Validated server-side and sent client-side. */
  query?: Query;
  /** JSON request body. */
  body?: Body;
  /** The success payload. */
  response: Response;
  /** Defaults to 200. */
  successStatus?: number;
  /**
   * Media type of the success payload, when it is not JSON.
   *
   * A handful of endpoints stream a file — a template, an admission letter, an
   * exported PDF. They still have one path, one set of params and one set of
   * middleware, so they belong in the contract; only the body is not JSON. The
   * generator documents these as a binary string, and a client fetches them
   * through its blob transport rather than `callApi`.
   */
  successContentType?: string;
}

/**
 * Identity helper that preserves each schema's exact type.
 *
 * Without it the schemas widen to `ZodTypeAny` and every consumer loses the
 * inference that makes the contract worth having.
 */
export const defineContract = <
  Params extends z.ZodTypeAny,
  Query extends z.ZodTypeAny,
  Body extends z.ZodTypeAny,
  Response extends z.ZodTypeAny
>(
  contract: RouteContract<Params, Query, Body, Response>
): RouteContract<Params, Query, Body, Response> => contract;

/** The value a client sends for `params` / `query` / `body`. */
export type ContractParams<C> = C extends RouteContract<infer P, any, any, any>
  ? z.infer<P>
  : never;
export type ContractQuery<C> = C extends RouteContract<any, infer Q, any, any>
  ? z.infer<Q>
  : never;
export type ContractBody<C> = C extends RouteContract<any, any, infer B, any>
  ? z.infer<B>
  : never;
/** What the endpoint resolves to. */
export type ContractResponse<C> = C extends RouteContract<
  any,
  any,
  any,
  infer R
>
  ? z.infer<R>
  : never;

/**
 * Substitute path params into a contract's path.
 *
 * The client builds its URL from the contract rather than repeating the
 * template, so a path that changes in one place changes everywhere — and a
 * missing param is a runtime error here rather than a request to
 * `/api/notes/undefined`.
 */
export const buildPath = (
  contract: Pick<RouteContract, 'path'>,
  params: Record<string, string | number> = {}
): string =>
  contract.path.replace(/:(\w+)/g, (_match, name: string) => {
    const value = params[name];
    if (value === undefined || value === null || value === '') {
      throw new Error(
        `buildPath: missing path parameter "${name}" for ${contract.path}`
      );
    }
    return encodeURIComponent(String(value));
  });

/**
 * A positive integer query param.
 *
 * Deliberately not `z.coerce.number()`: coercion runs `Number(value)`, and
 * `Number(['2'])` is 2 — so `?page[]=2` would pass, which is exactly the array
 * case this exists to reject. Requiring a string first makes the check real.
 *
 * The union accepts its own output, so parsing twice is the same as parsing
 * once. `mountContract` validates the query on the way in and writes the result
 * back to `req.query`; a handler that then calls `parseQuery` again would
 * otherwise be handed the number this transform produced and reject it.
 *
 * Shared rather than copied: this lived in `audit.ts` and the next paginated
 * endpoint would have duplicated it, comment and all — which is how the
 * `import X = require()` interop comments spread (see BACKEND_GUIDE B10).
 */
export const positiveIntParam = z.union([
  z.string().regex(/^\d+$/, 'must be a positive integer').transform(Number),
  z.number().int().positive()
]);

/**
 * The `page` / `limit` pair every paginated endpoint takes.
 *
 * `limit` is capped: it reaches a SQL `LIMIT`, so an uncapped one is a way to
 * ask the server for the whole table through an endpoint that exists to stop
 * exactly that.
 */
export const paginationQuery = {
  page: positiveIntParam.optional(),
  limit: positiveIntParam.pipe(z.number().max(100)).optional()
};
