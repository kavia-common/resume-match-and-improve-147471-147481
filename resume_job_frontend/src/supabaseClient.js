/**
 * Supabase client initialization.
 * Requires the following environment variables:
 * - REACT_APP_SUPABASE_URL
 * - REACT_APP_SUPABASE_ANON_KEY
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars are not set. Auth features will be disabled until provided.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
