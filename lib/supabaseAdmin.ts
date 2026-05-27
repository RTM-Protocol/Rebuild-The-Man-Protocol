import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase client using the service-role key. Bypasses RLS.
 * NEVER import this from a Client Component or expose it to the browser.
 * Used by:
 *   - Stripe webhook (inserts/updates `purchases` rows)
 *   - Account deletion route (deletes auth.users + cascades user data)
 *
 * Note: we intentionally don't pass a Database generic here — the project's
 * Database type only covers Tables, and supabase-js v2's typed client expects
 * Views/Functions/Enums/CompositeTypes too. Staying untyped keeps the surface
 * consistent with `lib/supabase.ts`.
 */
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Supabase admin client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.'
    );
  }

  cached = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return cached;
}
