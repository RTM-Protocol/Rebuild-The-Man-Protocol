'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { PURCHASE_URL } from '@/lib/purchaseUrl';
import { MAILTO_SUPPORT, EMAIL_LINK_CLASS } from '@/lib/mailtoUrls';

interface PaywallProps {
  /** Optional headline override (default: "Unlock All Protocols"). */
  headline?: string;
  /** If true, render with a transparent background (for use inside a gate). */
  embedded?: boolean;
}

const INCLUDED_ITEMS = [
  'All 4 protocols (Rebuild The Man, Pressure Valve, System Overload, Engine Restart, Reality Calibration)',
  'Emergency Tools — free for everyone, even without an account',
  'Progress tracking, streaks, and check-in history',
  'Field notes and weekly briefs',
  'All future protocols and feature updates at no extra cost',
];

export default function Paywall({ headline = 'Unlock All Protocols', embedded = false }: PaywallProps) {
  const { user, isLoading } = useAuth();
  const ctaClass = 'btn-primary w-full text-base sm:text-lg py-4 block text-center';

  return (
    <div className={embedded ? '' : 'min-h-screen bg-tactical-black flex items-center justify-center px-4 py-10 sm:py-16'}>
      <div className="w-full max-w-3xl">
        <div className="bg-tactical-darkgray border-2 border-tactical-orange p-6 sm:p-10">
          <p className="text-tactical-orange font-mono text-xs sm:text-sm uppercase tracking-widest mb-3 text-center">
            Lifetime access
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-3 leading-tight text-center">
            {headline}
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl text-center mb-8">
            One payment. Lifetime access. No subscriptions.
          </p>

          {/* Pricing is tier-dependent and lives on the landing site — never quote it here. */}
          <div className="bg-tactical-black border-2 border-tactical-lightgray p-6 mb-8 text-center">
            <p className="font-brand text-2xl sm:text-3xl font-bold text-white leading-tight">
              One payment. Yours for life.
            </p>
            <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mt-3">
              see current pricing on our main site
            </p>
          </div>

          {/* What's included */}
          <div className="mb-8">
            <h2 className="text-white font-bold uppercase text-sm mb-4 flex items-center gap-2">
              <span className="h-1 w-8 bg-tactical-orange" />
              <span>What&apos;s Included</span>
            </h2>
            <ul className="space-y-3">
              {INCLUDED_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-200">
                  <span className="text-tactical-green-bright text-xl leading-none mt-0.5" aria-hidden>
                    ✓
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Guarantee badge */}
          <div className="bg-tactical-orange/10 border-l-4 border-tactical-orange p-5 mb-8 flex items-start gap-3">
            <span className="text-2xl leading-none" aria-hidden>
              🛡️
            </span>
            <div>
              <p className="text-white font-bold uppercase tracking-wide text-sm mb-1">
                14-Day Money-Back Guarantee
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Try the app. If it&apos;s not for you, email{' '}
                <a href={MAILTO_SUPPORT} className={EMAIL_LINK_CLASS}>
                  support@rebuildthemanprotocol.com
                </a>{' '}
                within 14 days of purchase for a full refund. No questions asked.
              </p>
            </div>
          </div>

          {isLoading ? (
            <span className={`${ctaClass} opacity-60 cursor-not-allowed`} aria-hidden>
              Loading…
            </span>
          ) : user ? (
            <a href={PURCHASE_URL} className={ctaClass} rel="noopener">
              Get Lifetime Access on our main site →
            </a>
          ) : (
            <Link href="/signup?redirect=/paywall" className={ctaClass}>
              Create Your Account
            </Link>
          )}

          <p className="mt-4 text-xs text-gray-500 text-center">
            {user
              ? 'Takes you to rebuildthemanprotocol.com to complete your purchase. Secure payment via Stripe — card, Apple Pay, Google Pay, and PayPal supported.'
              : 'Create your account first, then complete your purchase on our main site.'}
          </p>

          <div className="mt-8 pt-6 border-t border-tactical-lightgray flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <Link
              href="/faq"
              className="text-gray-400 hover:text-tactical-orange transition-colors"
            >
              Have questions? Read the FAQ →
            </Link>
            <a href={MAILTO_SUPPORT} className={EMAIL_LINK_CLASS}>
              Email support
            </a>
          </div>
        </div>

        {!embedded && (
          <div className="mt-6 text-center text-sm text-gray-400">
            Already purchased?{' '}
            <Link
              href="/login"
              className="text-tactical-orange hover:text-tactical-orange-bright font-bold uppercase tracking-wide transition-colors"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
