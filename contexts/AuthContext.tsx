'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { CustomerRow } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  /** True only while the customer row's status is 'active'. */
  hasPaid: boolean;
  /** The caller's active customer row (if any). Useful for /account. */
  customer: CustomerRow | null;
  signOut: () => Promise<void>;
  /** Force-refetch the customer row (e.g. after returning from checkout). */
  refreshPaymentStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [customer, setCustomer] = useState<CustomerRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

  /**
   * RLS scopes `customers` to the caller's own row (matched on auth_user_id
   * or the session email), so no identity filter is applied here. `userId`
   * only decides whether it's worth querying at all.
   *
   * Every failure path clears the row, so access always fails CLOSED.
   */
  const fetchCustomer = useCallback(async (userId: string | null) => {
    if (!userId) {
      setCustomer(null);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('status', 'active')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Failed to load customer status:', error.message);
        if (isMountedRef.current) setCustomer(null);
        return;
      }
      if (isMountedRef.current) setCustomer((data as CustomerRow | null) ?? null);
    } catch (err) {
      console.error('Unexpected error fetching customer:', err);
      if (isMountedRef.current) setCustomer(null);
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    // Initial hydration from any persisted session.
    supabase.auth
      .getSession()
      .then(async ({ data }) => {
        if (!isMountedRef.current) return;
        setSession(data.session);
        setUser(data.session?.user ?? null);
        await fetchCustomer(data.session?.user?.id ?? null);
      })
      .catch((err) => {
        console.error('Initial getSession failed:', err);
      })
      .finally(() => {
        if (isMountedRef.current) setIsLoading(false);
      });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!isMountedRef.current) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      await fetchCustomer(newSession?.user?.id ?? null);
      setIsLoading(false);
    });

    return () => {
      isMountedRef.current = false;
      sub.subscription.unsubscribe();
    };
  }, [fetchCustomer]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setCustomer(null);
  }, []);

  const refreshPaymentStatus = useCallback(async () => {
    await fetchCustomer(user?.id ?? null);
  }, [fetchCustomer, user?.id]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      session,
      isLoading,
      hasPaid: customer?.status === 'active',
      customer,
      signOut,
      refreshPaymentStatus,
    }),
    [user, session, isLoading, customer, signOut, refreshPaymentStatus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
