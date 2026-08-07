import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';

/**
 * POST /api/account/delete
 *
 * Permanently deletes the authenticated user and all their data.
 * Requires the Supabase access token in the Authorization header.
 *
 * What gets deleted:
 *   - auth.users row
 *   - any rows in tables that have user_id FK to auth.users with CASCADE
 *
 * Note: the `customers` row is a billing record owned by the landing
 * project, keyed on a nullable auth_user_id, so it is not cascaded here.
 */
export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: 'Server is missing Supabase configuration.' },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get('authorization') || '';
  const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  // Verify the caller's token with anon client.
  const anon = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: userError } = await anon.auth.getUser(accessToken);
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }
  const userId = userData.user.id;

  // Use the admin client to delete the auth user. Any `user_progress`, etc.
  // rows with `ON DELETE CASCADE` on user_id will follow.
  try {
    const admin = getSupabaseAdmin();
    const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
    if (deleteError) {
      console.error('Failed to delete auth user:', deleteError.message);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }
    return NextResponse.json({ deleted: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete account.';
    console.error('Account deletion error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
