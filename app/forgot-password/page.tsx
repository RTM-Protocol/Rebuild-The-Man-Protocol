'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import AuthCard from '@/components/auth/AuthCard';
import {
  TextField,
  SubmitButton,
  FormError,
  FormInfo,
} from '@/components/auth/AuthFormFields';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        (typeof window !== 'undefined' ? window.location.origin : '');
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${baseUrl}/reset-password`,
      });

      // Always show the same neutral confirmation, regardless of whether the email exists.
      // This prevents account enumeration. We surface real errors only for client-side issues.
      if (resetError && !/not found|user/i.test(resetError.message)) {
        setError(resetError.message);
        return;
      }
      setInfo("If an account exists with that email, we've sent a password reset link.");
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send reset email. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      eyebrow="Forgot password"
      title="Reset Access"
      subtitle="Enter the email tied to your account. We'll send you a link to set a new password."
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

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="forgot-email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <div className="mt-6">
          <SubmitButton loading={submitting} loadingLabel="Sending…">
            Send Reset Link
          </SubmitButton>
        </div>
      </form>
    </AuthCard>
  );
}
