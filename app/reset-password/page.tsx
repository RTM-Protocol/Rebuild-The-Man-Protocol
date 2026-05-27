'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthCard from '@/components/auth/AuthCard';
import {
  PasswordField,
  SubmitButton,
  FormError,
  FormInfo,
} from '@/components/auth/AuthFormFields';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [recoveryReady, setRecoveryReady] = useState<boolean | null>(null);

  // Listen for the recovery event Supabase fires after parsing the email link.
  // detectSessionInUrl + PKCE flow will exchange the code automatically.
  useEffect(() => {
    let cancelled = false;

    const probe = async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      setRecoveryReady(Boolean(data.session));
    };
    probe();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (cancelled) return;
      if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
        setRecoveryReady(true);
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const validate = (): string | null => {
    if (!password) return 'Enter a new password.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
        return;
      }
      // Sign the user out so they go through a clean login with the new password.
      await supabase.auth.signOut();
      router.replace('/login?reset=1');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      eyebrow="Reset password"
      title="Set New Password"
      subtitle="Choose a new password. You'll be redirected to log in after it's saved."
      footer={
        <Link
          href="/login"
          className="text-tactical-orange hover:text-tactical-orange-bright font-bold uppercase tracking-wide transition-colors"
        >
          ← Back to login
        </Link>
      }
    >
      <FormError error={error} />
      <FormInfo message={info} />

      {recoveryReady === false && (
        <div className="mb-4 bg-red-900/20 border-l-4 border-red-600 text-red-200 px-4 py-3 text-sm leading-relaxed">
          This reset link is invalid or has expired. Request a new one from the{' '}
          <Link href="/forgot-password" className="underline font-bold">
            forgot password
          </Link>{' '}
          page.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <PasswordField
          id="reset-password-new"
          label="New Password (min 8 characters)"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting || recoveryReady === false}
        />
        <PasswordField
          id="reset-password-confirm"
          label="Confirm New Password"
          autoComplete="new-password"
          minLength={8}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={submitting || recoveryReady === false}
        />
        <div className="mt-6">
          <SubmitButton
            loading={submitting}
            loadingLabel="Updating…"
            disabled={recoveryReady === false}
          >
            Reset Password
          </SubmitButton>
        </div>
      </form>
    </AuthCard>
  );
}
