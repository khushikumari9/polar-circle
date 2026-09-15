/**
 * Shared HTTP helpers for the portal REST API.
 * JSON responses, CORS, validation and error handling.
 */

export const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

export function ok(data: unknown, meta?: Record<string, unknown>): Response {
  return json({ success: true, data, ...(meta ? { meta } : {}) });
}

export function created(data: unknown): Response {
  return json({ success: true, data }, 201);
}

export function preflight(): Response {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export const badRequest = (m: string, d?: unknown) => new ApiError(400, m, d);
export const unauthorized = (m = 'Unauthorized') => new ApiError(401, m);
export const forbidden = (m = 'Forbidden: insufficient role') => new ApiError(403, m);
export const notFound = (m = 'Resource not found') => new ApiError(404, m);

/** Wraps a handler so every failure returns a consistent JSON error body. */
export async function handle(fn: () => Promise<Response>): Promise<Response> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ApiError) {
      return json(
        { success: false, error: error.message, ...(error.details ? { details: error.details } : {}) },
        error.status,
      );
    }
    console.error('[api] unhandled error', error);
    return json({ success: false, error: 'Internal server error' }, 500);
  }
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw badRequest('Request body must be valid JSON');
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw badRequest('Request body must be a JSON object');
  }
  return body as Record<string, unknown>;
}

export function requireString(
  body: Record<string, unknown>,
  field: string,
  opts: { min?: number; max?: number } = {},
): string {
  const value = body[field];
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw badRequest(`Field "${field}" is required and must be a non-empty string`);
  }
  const trimmed = value.trim();
  if (opts.min && trimmed.length < opts.min) {
    throw badRequest(`Field "${field}" must be at least ${opts.min} characters`);
  }
  if (trimmed.length > (opts.max ?? 5000)) {
    throw badRequest(`Field "${field}" must be at most ${opts.max ?? 5000} characters`);
  }
  return trimmed;
}

export function optionalString(
  body: Record<string, unknown>,
  field: string,
  max = 5000,
): string | null {
  const value = body[field];
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') throw badRequest(`Field "${field}" must be a string`);
  if (value.length > max) throw badRequest(`Field "${field}" must be at most ${max} characters`);
  return value.trim();
}

export function requireEmail(body: Record<string, unknown>, field = 'email'): string {
  const value = requireString(body, field, { max: 320 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw badRequest(`Field "${field}" must be a valid email address`);
  }
  return value.toLowerCase();
}

export function requireEnum<T extends string>(
  body: Record<string, unknown>,
  field: string,
  allowed: readonly T[],
): T {
  const value = requireString(body, field);
  if (!(allowed as readonly string[]).includes(value)) {
    throw badRequest(`Field "${field}" must be one of: ${allowed.join(', ')}`);
  }
  return value as T;
}

export function pagination(url: URL): { limit: number; offset: number } {
  const limit = Math.min(Math.max(Number(url.searchParams.get('limit') ?? 25) || 25, 1), 100);
  const offset = Math.max(Number(url.searchParams.get('offset') ?? 0) || 0, 0);
  return { limit, offset };
}

export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export function requireUuidParam(value: string, name = 'id'): string {
  if (!isUuid(value)) throw badRequest(`Path parameter "${name}" must be a valid UUID`);
  return value;
}
