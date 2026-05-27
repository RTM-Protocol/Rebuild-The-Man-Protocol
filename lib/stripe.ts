import Stripe from 'stripe';

/** Lifetime access price — single source of truth. Update here, propagates everywhere. */
export const LIFETIME_PRICE_PENCE = 9700;
export const LIFETIME_PRICE_DISPLAY = '£97';
export const LIFETIME_CURRENCY = 'gbp';
export const LIFETIME_PRODUCT_NAME = 'Rebuild the Man Protocol — Lifetime Access';
export const LIFETIME_PRODUCT_DESCRIPTION =
  'One-time payment. Lifetime access to all four protocols, Emergency Tools, progress tracking, and every future update. 14-day money-back guarantee.';

/**
 * Server-side Stripe client. Lazy so route handlers compile cleanly even if
 * STRIPE_SECRET_KEY is not yet set in the environment (build time).
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set in the environment.');
  }

  cached = new Stripe(secretKey, {
    typescript: true,
  });
  return cached;
}

/** Base URL used for Stripe success/cancel redirects. */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}
