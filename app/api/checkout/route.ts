import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  getStripe,
  getBaseUrl,
  LIFETIME_PRICE_PENCE,
  LIFETIME_CURRENCY,
  LIFETIME_PRODUCT_NAME,
  LIFETIME_PRODUCT_DESCRIPTION,
} from '@/lib/stripe';

export const runtime = 'nodejs';

/**
 * POST /api/checkout
 * Body: none (the caller is authenticated via Supabase access token).
 *
 * The browser passes the user's Supabase access token in the Authorization
 * header so this route can identify them server-side and stamp the Stripe
 * checkout session metadata with their user_id.
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

  // Authenticate the caller via their Bearer token.
  const authHeader = request.headers.get('authorization') || '';
  const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }
  const { id: userId, email } = userData.user;

  // If this user has already paid, short-circuit.
  const { data: existing } = await supabase
    .from('purchases')
    .select('id, status')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .limit(1)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: 'You already have lifetime access.', alreadyPaid: true },
      { status: 409 }
    );
  }

  try {
    const stripe = getStripe();
    const baseUrl = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email ?? undefined,
      // Omitting `payment_method_types` lets the Stripe Dashboard control
      // which methods are offered (card, Apple Pay, Google Pay, PayPal,
      // etc.) — no code change required when you enable PayPal in the
      // dashboard under Settings → Payment Methods.
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: LIFETIME_CURRENCY,
            unit_amount: LIFETIME_PRICE_PENCE,
            product_data: {
              name: LIFETIME_PRODUCT_NAME,
              description: LIFETIME_PRODUCT_DESCRIPTION,
            },
          },
        },
      ],
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment/cancelled`,
      metadata: {
        user_id: userId,
      },
      // Mirror the user_id onto the resulting PaymentIntent so the refund
      // webhook can recover it even when only a charge.refunded event arrives.
      payment_intent_data: {
        metadata: { user_id: userId },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe did not return a checkout URL.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url, id: session.id }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create Stripe Checkout session.';
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
