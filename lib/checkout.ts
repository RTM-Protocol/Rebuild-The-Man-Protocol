import { supabase } from './supabase';

/**
 * Initiates a Stripe Checkout session for the currently authenticated user
 * and redirects the browser to Stripe's hosted page.
 *
 * Returns a non-null error message if anything went wrong (e.g. user not
 * logged in, already paid, API failure). On success, this function does not
 * return — the page redirects.
 */
export async function startCheckout(): Promise<string | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) {
    return 'You need to be logged in to make a purchase.';
  }

  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const payload = (await res.json().catch(() => ({}))) as {
      url?: string;
      error?: string;
      alreadyPaid?: boolean;
    };

    if (!res.ok || !payload.url) {
      if (payload.alreadyPaid) {
        // User already has lifetime access — send them to the dashboard.
        window.location.assign('/');
        return null;
      }
      return payload.error ?? `Checkout failed (${res.status}).`;
    }

    window.location.assign(payload.url);
    return null;
  } catch (err) {
    return err instanceof Error ? err.message : 'Unexpected checkout error.';
  }
}
