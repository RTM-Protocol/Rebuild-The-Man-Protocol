'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthCard from '@/components/auth/AuthCard';
import {
  TextField,
  PasswordField,
  SubmitButton,
  FormError,
  FormInfo,
  GoogleButton,
  AUTH_FORM_DIVIDER,
} from '@/components/auth/AuthFormFields';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // If a logged-in user lands here, bounce to dashboard.
  useEffect(() => {
    if (!authLoading && user) router.replace('/');
  }, [authLoading, user, router]);

  const validate = (): string | null => {
    if (!email || !password) return 'Email and password are required.';
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
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        (typeof window !== 'undefined' ? window.location.origin : '');
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${baseUrl}/login`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // If email confirmations are enabled (default), no session is returned.
      // If they're disabled (rare), Supabase returns a session immediately.
      if (data.session) {
        router.replace('/');
        return;
      }

      setInfo(
        'Check your email to verify your account. The link will bring you back to log in.'
      );
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setOauthLoading(true);
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        (typeof window !== 'undefined' ? window.location.origin : '');
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${baseUrl}/` },
      });
      if (oauthError) {
        setError(oauthError.message);
        setOauthLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start Google sign-in.');
      setOauthLoading(false);
    }
  };

  return (
    <AuthCard
      eyebrow="Create account"
      title="Sign Up"
      subtitle="One account. Lifetime access (with a 14-day money-back guarantee)."
      footer={
        <>
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-tactical-orange hover:text-tactical-orange-bright font-bold uppercase tracking-wide transition-colors"
          >
            Log in
          </Link>
        </>
      }
    >
      <FormError error={error} />
      <FormInfo message={info} />

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="signup-email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <PasswordField
          id="signup-password"
          label="Password (min 8 characters)"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
        />
        <PasswordField
          id="signup-confirm-password"
          label="Confirm Password"
          autoComplete="new-password"
          minLength={8}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={submitting}
        />
        <div className="mt-6">
          <SubmitButton loading={submitting} loadingLabel="Creating account…">
            Create Account
          </SubmitButton>
        </div>
      </form>

      {AUTH_FORM_DIVIDER}

      <GoogleButton onClick={handleGoogle} loading={oauthLoading} />
    </AuthCard>
  );
}
