import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Get your Anon Key from: https://supabase.com/dashboard/project/ohuacjksnmmzltgfvbdo/settings/api
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ohuacjksnmmzltgfvbdo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 20;
};

// Create Supabase client (only if configured)
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          'X-Supabase-Mock': 'true', // Indicates this is a mock client
        },
      },
    });

// Database Types
export interface DbExpense {
  id: string;
  user_id?: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  recurring: boolean;
  frequency?: 'monthly' | 'weekly';
  start_date?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DbTripSavings {
  id?: string;
  user_id?: string;
  target: number;
  deadline: string;
  saved: number;
  entries: Array<{ date: string; amount: number }>;
  created_at?: string;
  updated_at?: string;
}

export interface DbFinanceData {
  id?: string;
  user_id?: string;
  salary: number;
  salary_date: string;
  monthly_snapshots: Record<string, { income: number; expenses: number; balance: number }>;
  created_at?: string;
  updated_at?: string;
}

