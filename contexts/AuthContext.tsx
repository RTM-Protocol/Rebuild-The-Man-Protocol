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
import type { PurchaseRow } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  /** True once a 'completed' purchase row exists for this user. */
  hasPaid: boolean;
  /** Most recent completed purchase (if any). Useful for /account. */
  purchase: PurchaseRow | null;
  signOut: () => Promise<void>;
  /** Force-refetch the purchase row (e.g. after returning from Stripe Checkout). */
  refreshPaymentStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [purchase, setPurchase] = useState<PurchaseRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

  const fetchPurchase = useCallback(async (userId: string | null) => {
    if (!userId) {
      setPurchase(null);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'completed')
        .order('purchased_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Failed to load purchase status:', error.message);
        if (isMountedRef.current) setPurchase(null);
        return;
      }
      if (isMountedRef.current) setPurchase((data as PurchaseRow | null) ?? null);
    } catch (err) {
      console.error('Unexpected error fetching purchase:', err);
      if (isMountedRef.current) setPurchase(null);
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
        await fetchPurchase(data.session?.user?.id ?? null);
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
      await fetchPurchase(newSession?.user?.id ?? null);
      setIsLoading(false);
    });

    return () => {
      isMountedRef.current = false;
      sub.subscription.unsubscribe();
    };
  }, [fetchPurchase]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setPurchase(null);
  }, []);

  const refreshPaymentStatus = useCallback(async () => {
    await fetchPurchase(user?.id ?? null);
  }, [fetchPurchase, user?.id]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      session,
      isLoading,
      hasPaid: purchase?.status === 'completed',
      purchase,
      signOut,
      refreshPaymentStatus,
    }),
    [user, session, isLoading, purchase, signOut, refreshPaymentStatus]
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
