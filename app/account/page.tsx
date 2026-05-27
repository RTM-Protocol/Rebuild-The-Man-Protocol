'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  MAILTO_SUPPORT,
  MAILTO_REQUESTS,
  EMAIL_LINK_CLASS,
} from '@/lib/mailtoUrls';
import { LIFETIME_PRICE_DISPLAY } from '@/lib/stripe';
import { startCheckout } from '@/lib/checkout';

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

function formatAmount(pence: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(pence / 100);
  } catch {
    return `${(pence / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, hasPaid, purchase, signOut } = useAuth();
  const [resetEmailStatus, setResetEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [resetErrorMsg, setResetErrorMsg] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login?redirect=/account');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-tactical-black flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white font-bold uppercase tracking-widest text-sm">Loading…</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSendPasswordReset = async () => {
    if (!user.email) return;
    setResetEmailStatus('sending');
    setResetErrorMsg(null);
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        (typeof window !== 'undefined' ? window.location.origin : '');
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${baseUrl}/reset-password`,
      });
      if (error) {
        setResetEmailStatus('error');
        setResetErrorMsg(error.message);
        return;
      }
      setResetEmailStatus('sent');
    } catch (err) {
      setResetEmailStatus('error');
      setResetErrorMsg(err instanceof Error ? err.message : 'Failed to send reset email.');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  const handleStartCheckout = async () => {
    setCheckoutError(null);
    setCheckingOut(true);
    const errMsg = await startCheckout();
    if (errMsg) {
      setCheckoutError(errMsg);
      setCheckingOut(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) {
        setDeleteError('Session expired. Please log in again.');
        setDeleting(false);
        return;
      }
      const res = await fetch('/api/account/delete', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setDeleteError(payload.error || `Deletion failed (${res.status}).`);
        setDeleting(false);
        return;
      }
      await supabase.auth.signOut();
      try {
        localStorage.clear();
      } catch {
        // ignore — some browsers throw in privacy modes
      }
      router.replace('/?deleted=1');
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete account.');
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-tactical-black flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-tactical-orange hover:text-tactical-orange-bright text-sm font-bold uppercase tracking-wide transition-colors"
          >
            <span aria-hidden>←</span>
            <span>Back to Home</span>
          </Link>
        </div>

        <header className="mb-10 pb-8 border-b border-tactical-lightgray">
          <p className="text-tactical-orange font-mono text-xs sm:text-sm uppercase tracking-widest mb-3">
            Account
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4 leading-tight">
            Your Profile
          </h1>
          <p className="font-brand text-lg sm:text-xl">
            <span style={{ color: '#faf9f5' }}>Rebuild The Man</span>{' '}
            <span style={{ color: '#cc6119' }}>Protocol</span>
          </p>
        </header>

        {/* Profile block */}
        <section className="mb-10 bg-tactical-darkgray border border-tactical-lightgray p-6">
          <dl className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="text-tactical-orange font-mono text-sm uppercase sm:min-w-[12rem]">
                Email
              </dt>
              <dd className="text-white font-semibold break-all">{user.email ?? '—'}</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="text-tactical-orange font-mono text-sm uppercase sm:min-w-[12rem]">
                Status
              </dt>
              <dd>
                {hasPaid ? (
                  <span className="inline-flex items-center gap-2 bg-tactical-green/20 border border-tactical-green-bright/60 text-tactical-green-bright font-bold uppercase tracking-widest text-xs px-3 py-1">
                    <span aria-hidden>✓</span> Lifetime Access
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-tactical-orange/15 border border-tactical-orange/60 text-tactical-orange-bright font-bold uppercase tracking-widest text-xs px-3 py-1">
                    <span aria-hidden>🔒</span> Free — Emergency Tools Only
                  </span>
                )}
              </dd>
            </div>
            {hasPaid && purchase && (
              <>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <dt className="text-tactical-orange font-mono text-sm uppercase sm:min-w-[12rem]">
                    Purchase date
                  </dt>
                  <dd className="text-white">{formatDate(purchase.purchased_at)}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <dt className="text-tactical-orange font-mono text-sm uppercase sm:min-w-[12rem]">
                    Amount paid
                  </dt>
                  <dd className="text-white">
                    {formatAmount(purchase.amount_paid, purchase.currency)}
                  </dd>
                </div>
              </>
            )}
          </dl>
        </section>

        {/* Upgrade CTA for unpaid users */}
        {!hasPaid && (
          <section className="mb-10 bg-tactical-darkgray border-2 border-tactical-orange p-6">
            <h2 className="text-xl font-bold text-white uppercase mb-2">Unlock Lifetime Access</h2>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              One-time payment of {LIFETIME_PRICE_DISPLAY}. All protocols, Emergency Tools,
              progress tracking, and every future update. 14-day money-back guarantee.
            </p>
            {checkoutError && (
              <div className="mb-4 bg-red-900/20 border-l-4 border-red-600 text-red-200 px-4 py-3 text-sm leading-relaxed">
                {checkoutError}
              </div>
            )}
            <button
              type="button"
              onClick={handleStartCheckout}
              disabled={checkingOut}
              className="btn-primary w-full sm:w-auto text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkingOut ? 'Redirecting…' : `Get Lifetime Access — ${LIFETIME_PRICE_DISPLAY}`}
            </button>
          </section>
        )}

        {/* Account actions */}
        <section className="mb-10">
          <h2 className="text-white font-bold uppercase text-sm mb-4 flex items-center gap-2">
            <span className="h-1 w-8 bg-tactical-orange" />
            <span>Account Actions</span>
          </h2>

          <div className="space-y-4">
            <div className="bg-tactical-darkgray border border-tactical-lightgray p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-white font-bold uppercase tracking-wide text-sm mb-1">
                  Change Password
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We&apos;ll email you a secure link to set a new password.
                </p>
                {resetEmailStatus === 'sent' && (
                  <p className="text-tactical-green-bright text-sm mt-2">
                    Reset link sent. Check your inbox.
                  </p>
                )}
                {resetEmailStatus === 'error' && resetErrorMsg && (
                  <p className="text-red-400 text-sm mt-2">{resetErrorMsg}</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleSendPasswordReset}
                disabled={resetEmailStatus === 'sending'}
                className="btn-secondary text-sm disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
              >
                {resetEmailStatus === 'sending' ? 'Sending…' : 'Send Reset Email'}
              </button>
            </div>

            <div className="bg-tactical-darkgray border border-tactical-lightgray p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-white font-bold uppercase tracking-wide text-sm mb-1">
                  Sign Out
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  End your session on this device.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="btn-secondary text-sm shrink-0"
              >
                Sign Out
              </button>
            </div>
          </div>
        </section>

        {/* Danger zone */}
        <section className="mb-10 bg-red-900/10 border-2 border-red-700 p-6">
          <h2 className="text-red-300 font-bold uppercase tracking-wide mb-2">
            Delete Account
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Deleting your account will permanently remove all your data including protocol
            progress, check-ins, and field notes. This cannot be undone.
          </p>
          {deleteError && (
            <div className="mb-4 bg-red-900/20 border-l-4 border-red-600 text-red-200 px-4 py-3 text-sm leading-relaxed">
              {deleteError}
            </div>
          )}
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="bg-red-700 hover:bg-red-600 text-white font-bold uppercase tracking-widest text-sm py-3 px-6 transition-colors"
          >
            Delete My Account
          </button>
        </section>

        {/* Contact help */}
        <section className="text-sm text-gray-400 text-center border-t border-tactical-lightgray pt-6">
          Need help with billing, refunds, or your account?{' '}
          <a href={MAILTO_SUPPORT} className={EMAIL_LINK_CLASS}>
            support@rebuildthemanprotocol.com
          </a>{' '}
          ·{' '}
          <a href={MAILTO_REQUESTS} className={EMAIL_LINK_CLASS}>
            data &amp; privacy
          </a>
        </section>
      </main>

      <Footer />

      <ConfirmationModal
        isOpen={deleteOpen}
        title="Delete your account?"
        message="Are you sure? This action cannot be undone. Your profile, progress, check-ins, field notes, and purchase record will all be permanently removed."
        confirmText={deleting ? 'Deleting…' : 'Yes, Delete'}
        cancelText="Cancel"
        onConfirm={handleDelete}
        onClose={() => {
          if (!deleting) setDeleteOpen(false);
        }}
        isDangerous
      />
    </div>
  );
}
