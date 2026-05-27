'use client';

import { useState, type InputHTMLAttributes } from 'react';

const baseInputClass =
  'w-full bg-tactical-black border-2 border-tactical-lightgray text-white px-4 py-3 font-mono text-sm focus:border-tactical-orange focus:outline-none transition-colors placeholder-gray-600 disabled:opacity-60';

const labelClass =
  'block text-xs font-bold uppercase tracking-widest text-gray-300 mb-2';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  id: string;
}

export function TextField({ label, id, ...rest }: TextFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} className={baseInputClass} {...rest} />
    </div>
  );
}

interface PasswordFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  label: string;
  id: string;
}

export function PasswordField({ label, id, ...rest }: PasswordFieldProps) {
  const [shown, setShown] = useState(false);
  return (
    <div className="mb-4">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={shown ? 'text' : 'password'}
          className={`${baseInputClass} pr-20`}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShown((v) => !v)}
          className="absolute inset-y-0 right-0 px-3 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-tactical-orange transition-colors"
          aria-label={shown ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {shown ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}

interface SubmitButtonProps {
  loading: boolean;
  children: React.ReactNode;
  loadingLabel?: string;
  disabled?: boolean;
}

export function SubmitButton({ loading, children, loadingLabel, disabled }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="btn-primary w-full text-sm disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (loadingLabel ?? 'Please wait…') : children}
    </button>
  );
}

interface FormErrorProps {
  error: string | null;
}

export function FormError({ error }: FormErrorProps) {
  if (!error) return null;
  return (
    <div
      role="alert"
      className="mb-4 bg-red-900/20 border-l-4 border-red-600 text-red-200 px-4 py-3 text-sm leading-relaxed"
    >
      {error}
    </div>
  );
}

interface FormInfoProps {
  message: string | null;
}

export function FormInfo({ message }: FormInfoProps) {
  if (!message) return null;
  return (
    <div className="mb-4 bg-tactical-orange/10 border-l-4 border-tactical-orange text-gray-100 px-4 py-3 text-sm leading-relaxed">
      {message}
    </div>
  );
}

interface GoogleButtonProps {
  onClick: () => void;
  loading: boolean;
  label?: string;
}

export function GoogleButton({ onClick, loading, label }: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 bg-tactical-black border-2 border-tactical-lightgray hover:border-tactical-orange text-white font-bold uppercase tracking-wide text-sm py-3 px-4 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      aria-label="Continue with Google"
    >
      {/* Inline Google G logo */}
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46 1.08 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
        />
        <path
          fill="#4285F4"
          d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
        />
        <path
          fill="#FBBC05"
          d="M3.88 10.78a5.54 5.54 0 0 1-.3-1.78c0-.62.11-1.22.29-1.78L.96 4.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
        />
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
        />
      </svg>
      <span>{loading ? 'Redirecting…' : label ?? 'Continue with Google'}</span>
    </button>
  );
}

export const AUTH_FORM_DIVIDER = (
  <div className="my-6 flex items-center gap-3">
    <div className="h-px flex-1 bg-tactical-lightgray" />
    <span className="text-xs font-mono uppercase tracking-widest text-gray-500">or</span>
    <div className="h-px flex-1 bg-tactical-lightgray" />
  </div>
);
