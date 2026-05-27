import { NextResponse, type NextRequest } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
// IMPORTANT: never cache; webhook bodies must be received raw.
export const dynamic = 'force-dynamic';

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId =
    (session.metadata && (session.metadata.user_id as string | undefined)) || null;
  if (!userId) {
    console.error('checkout.session.completed missing metadata.user_id', session.id);
    return;
  }
  if (session.payment_status !== 'paid') {
    console.warn('checkout.session.completed received with non-paid status', {
      sessionId: session.id,
      status: session.payment_status,
    });
    return;
  }

  const supabase = getSupabaseAdmin();

  // Idempotency: don't double-insert if Stripe re-delivers this event.
  const { data: existing } = await supabase
    .from('purchases')
    .select('id')
    .eq('stripe_checkout_session_id', session.id)
    .limit(1)
    .maybeSingle();

  if (existing) return;

  const customerId =
    typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null;

  const { error } = await supabase.from('purchases').insert({
    user_id: userId,
    stripe_checkout_session_id: session.id,
    stripe_customer_id: customerId,
    amount_paid: session.amount_total ?? 0,
    currency: session.currency ?? 'gbp',
    status: 'completed',
  });

  if (error) {
    console.error('Failed to insert purchase row:', error.message);
    throw new Error(`purchase insert failed: ${error.message}`);
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  const supabase = getSupabaseAdmin();
  const paymentIntent = charge.payment_intent;
  const refundedAt = new Date().toISOString();

  // Strategy 1: locate purchase by Stripe customer_id.
  const customerId =
    typeof charge.customer === 'string' ? charge.customer : charge.customer?.id ?? null;

  // Strategy 2: fall back to the user_id on the PaymentIntent metadata.
  let userId: string | null =
    (charge.metadata && (charge.metadata.user_id as string | undefined)) || null;

  if (!userId && paymentIntent) {
    try {
      const stripe = getStripe();
      const piId = typeof paymentIntent === 'string' ? paymentIntent : paymentIntent.id;
      const pi = await stripe.paymentIntents.retrieve(piId);
      userId = (pi.metadata && (pi.metadata.user_id as string | undefined)) || null;
    } catch (err) {
      console.error('Failed to retrieve PaymentIntent for refund:', err);
    }
  }

  let query = supabase.from('purchases').update({ status: 'refunded', refunded_at: refundedAt });

  if (customerId) {
    query = query.eq('stripe_customer_id', customerId);
  } else if (userId) {
    query = query.eq('user_id', userId);
  } else {
    console.error('charge.refunded received without identifiable customer or user', charge.id);
    return;
  }

  const { error } = await query.eq('status', 'completed');
  if (error) {
    console.error('Failed to mark purchase refunded:', error.message);
    throw new Error(`purchase refund update failed: ${error.message}`);
  }
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
  }
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured.');
    return NextResponse.json({ error: 'Webhook not configured.' }, { status: 500 });
  }

  // Read the raw body for signature verification — DO NOT use request.json().
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid signature.';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;
      default:
        // Acknowledge unhandled events with 200 so Stripe doesn't keep retrying.
        break;
    }
  } catch (err) {
    // Returning a 500 tells Stripe to retry — appropriate for transient DB errors.
    const message = err instanceof Error ? err.message : 'Webhook handler failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
