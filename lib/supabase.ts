import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client
// detectSessionInUrl: true is required so Supabase can pick up the session
// after Google OAuth redirects and password-reset email links.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '');
};

// Database types

/** Only 'active' grants access. A refunded customer keeps their row. */
export type CustomerStatus = 'active' | 'cancelled' | 'refunded';

export type CustomerType = 'founding' | 'standard';

/**
 * Written by the landing site's Stripe webhook — this app only reads it.
 * RLS scopes any select to the caller's own row (matched on auth_user_id
 * or the session email), so queries here never filter by identity.
 */
export interface CustomerRow {
  id: string;
  auth_user_id: string | null;
  email: string;
  customer_type: CustomerType;
  stripe_customer_id: string | null;
  /** Minor units (pence for GBP). */
  amount_paid: number;
  currency: string;
  status: CustomerStatus;
  created_at: string;
  refunded_at: string | null;
}

export type Database = {
  public: {
    Tables: {
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          active_protocol: any | null;
          completed_protocols: any[];
          lifetime_stats: any;
          reminder_settings: any;
          last_synced: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          active_protocol?: any | null;
          completed_protocols?: any[];
          lifetime_stats?: any;
          reminder_settings?: any;
          last_synced?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          active_protocol?: any | null;
          completed_protocols?: any[];
          lifetime_stats?: any;
          reminder_settings?: any;
          last_synced?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      customers: {
        Row: CustomerRow;
        Insert: {
          id?: string;
          auth_user_id?: string | null;
          email: string;
          customer_type?: CustomerType;
          stripe_customer_id?: string | null;
          amount_paid: number;
          currency?: string;
          status?: CustomerStatus;
          created_at?: string;
          refunded_at?: string | null;
        };
        Update: {
          id?: string;
          auth_user_id?: string | null;
          email?: string;
          customer_type?: CustomerType;
          stripe_customer_id?: string | null;
          amount_paid?: number;
          currency?: string;
          status?: CustomerStatus;
          created_at?: string;
          refunded_at?: string | null;
        };
      };
    };
  };
};











