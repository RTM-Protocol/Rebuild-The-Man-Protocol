'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthCard from '@/components/auth/AuthCard';
import { useAuth } from '@/contexts/AuthContext';
import { LIFETIME_PRICE_DISPLAY } from '@/lib/stripe';

function PaymentSuccessInner() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const { user, hasPaid, isLoading, refreshPaymentStatus } = useAuth();
  const [statusText, setStatusText] = useState<string>(
    'Confirming your purchase…'
  );

  // If the user isn't logged in, kick them to /login (preserving the session id).
  useEffect(() => {
    if (!isLoading && !user) {
      const redirect = sessionId
        ? `/payment/success?session_id=${encodeURIComponent(sessionId)}`
        : '/payment/success';
      router.replace(`/login?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [isLoading, user, sessionId, router]);

  // Poll our DB a few times in case the webhook hasn't landed yet.
  useEffect(() => {
    if (!user) return;
    if (hasPaid) {
      setStatusText('Lifetime access unlocked.');
      return;
    }
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 8; // ~16s total

    const tick = async () => {
      attempts += 1;
      await refreshPaymentStatus();
      if (cancelled) return;
      if (attempts >= maxAttempts) {
        setStatusText(
          'Payment received. Your access is being processed and will appear shortly. ' +
            'If this takes more than a minute, refresh the page or email support.'
        );
        return;
      }
      setTimeout(tick, 2000);
    };
    setTimeout(tick, 1500);
    return () => {
      cancelled = true;
    };
  }, [user, hasPaid, refreshPaymentStatus]);

  return (
    <AuthCard
      eyebrow="Payment confirmed"
      title="Welcome to the Protocol."
      subtitle={
        <>
          Payment successful. Welcome to{' '}
          <span className="font-brand">
            <span style={{ color: '#faf9f5' }}>Rebuild The Man</span>{' '}
            <span style={{ color: '#cc6119' }}>Protocol</span>
          </span>
          . Your one-time payment of{' '}
          <span className="text-white font-bold">{LIFETIME_PRICE_DISPLAY}</span> gives you lifetime
          access to all protocols, Emergency Tools, progress tracking, and every future update.
        </>
      }
      footer={
        <Link
          href="/account"
          className="text-tactical-orange hover:text-tactical-orange-bright font-bold uppercase tracking-wide transition-colors"
        >
          View account
        </Link>
      }
    >
      <div className="mb-6 bg-tactical-orange/10 border-l-4 border-tactical-orange text-gray-100 px-4 py-3 text-sm leading-relaxed">
        {statusText}
      </div>

      <Link
        href="/"
        className="btn-primary block w-full text-center text-sm"
      >
        Start Your First Protocol
      </Link>

      <p className="mt-4 text-xs text-gray-500 text-center">
        Remember: you have 14 days to request a full refund. No questions asked.
      </p>
    </AuthCard>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessInner />
    </Suspense>
  );
}
