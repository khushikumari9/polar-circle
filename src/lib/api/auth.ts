/**
 * Authentication + role middleware for the portal REST API.
 * Bearer JWTs are issued by the platform auth service on /api/public/auth/login.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { forbidden, unauthorized } from './http';

export type AppRole = Database['public']['Enums']['app_role'];

export interface AuthUser {
  id: string;
  email: string | null;
  roles: AppRole[];
  role: AppRole;
}

/** Service-role client; loaded lazily so it never reaches the client bundle. */
export async function getAdmin() {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  return supabaseAdmin;
}

/** Anon-key client used for signup / login / token refresh. */
export function getAuthClient(): SupabaseClient<Database> {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Backend auth is not configured');
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) {
          headers.delete('Authorization');
        }
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

function bearerToken(request: Request): string | null {
  const header = request.headers.get('authorization');
  if (!header || !header.toLowerCase().startsWith('bearer ')) return null;
  const token = header.slice(7).trim();
  return token.length > 0 ? token : null;
}

/** Returns the authenticated user with roles, or null for anonymous callers. */
export async function getUser(request: Request): Promise<AuthUser | null> {
  const token = bearerToken(request);
  if (!token) return null;

  const admin = await getAdmin();
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;

  const { data: roleRows } = await admin
    .from('user_roles')
    .select('role')
    .eq('user_id', data.user.id);

  const roles = (roleRows ?? []).map((r) => r.role as AppRole);
  const effective: AppRole = roles.includes('admin')
    ? 'admin'
    : roles.includes('researcher')
      ? 'researcher'
      : 'public_user';

  return { id: data.user.id, email: data.user.email ?? null, roles, role: effective };
}

/** Requires a valid token. */
export async function requireUser(request: Request): Promise<AuthUser> {
  const user = await getUser(request);
  if (!user) throw unauthorized('A valid Bearer token is required');
  return user;
}

/** Requires a valid token whose user holds one of the allowed roles. */
export async function requireRole(
  request: Request,
  allowed: readonly AppRole[],
): Promise<AuthUser> {
  const user = await requireUser(request);
  const permitted = allowed.some((role) => user.roles.includes(role)) || user.roles.includes('admin');
  if (!permitted) throw forbidden(`This endpoint requires role: ${allowed.join(' or ')}`);
  return user;
}

export const requireResearcher = (request: Request) => requireRole(request, ['researcher']);
export const requireAdmin = (request: Request) => requireRole(request, ['admin']);
