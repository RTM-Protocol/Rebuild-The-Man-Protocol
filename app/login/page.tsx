'use client';

import { Suspense, useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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

function LoginPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  const redirectTo = params.get('redirect') || '/';
  const initialInfo =
    params.get('reset') === '1' ? 'Password updated. You can now log in.' : null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(initialInfo);

  useEffect(() => {
    if (!authLoading && user) router.replace(redirectTo);
  }, [authLoading, user, redirectTo, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      router.replace(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not log in. Try again.');
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
        options: { redirectTo: `${baseUrl}${redirectTo}` },
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
      eyebrow="Welcome back"
      title="Log In"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-tactical-orange hover:text-tactical-orange-bright font-bold uppercase tracking-wide transition-colors"
          >
            Sign up
          </Link>
        </>
      }
    >
      <FormError error={error} />
      <FormInfo message={info} />

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <PasswordField
          id="login-password"
          label="Password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
        />
        <div className="mb-6 text-right">
          <Link
            href="/forgot-password"
            className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-tactical-orange transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
        <SubmitButton loading={submitting} loadingLabel="Logging in…">
          Log In
        </SubmitButton>
      </form>

      {AUTH_FORM_DIVIDER}

      <GoogleButton onClick={handleGoogle} loading={oauthLoading} />
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}
