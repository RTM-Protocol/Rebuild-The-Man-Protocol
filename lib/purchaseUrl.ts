/**
 * Purchasing lives entirely on the landing site — this app never creates
 * Stripe sessions, it links out. Set NEXT_PUBLIC_SITE_URL to point at a
 * local landing server while testing the hand-off.
 */
const LANDING_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://rebuildthemanprotocol.com'
).replace(/\/+$/, '');

/** Path of the purchase page on the landing site. */
const PURCHASE_PATH = '/';

export const PURCHASE_URL = `${LANDING_ORIGIN}${PURCHASE_PATH}`;
