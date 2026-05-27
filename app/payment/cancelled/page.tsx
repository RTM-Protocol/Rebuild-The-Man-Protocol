'use client';

import Link from 'next/link';
import AuthCard from '@/components/auth/AuthCard';
import { MAILTO_SUPPORT, EMAIL_LINK_CLASS } from '@/lib/mailtoUrls';

export default function PaymentCancelledPage() {
  return (
    <AuthCard
      eyebrow="Checkout cancelled"
      title="No Charge Was Made."
      subtitle="Your card was not charged. You can try again at any time, or reach out if something went wrong."
    >
      <Link href="/paywall" className="btn-primary block w-full text-center text-sm">
        Try Again
      </Link>

      <p className="mt-6 text-sm text-gray-300 text-center">
        Have questions?{' '}
        <a href={MAILTO_SUPPORT} className={EMAIL_LINK_CLASS}>
          support@rebuildthemanprotocol.com
        </a>
      </p>

      <div className="mt-8 pt-6 border-t border-tactical-lightgray text-center">
        <Link
          href="/"
          className="text-gray-400 hover:text-tactical-orange text-xs font-bold uppercase tracking-wide transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </AuthCard>
  );
}
