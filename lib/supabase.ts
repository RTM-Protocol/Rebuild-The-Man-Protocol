import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '');
};

// Database types
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
    };
  };
};











