import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './constants';

const hasValidConfig =
  SUPABASE_URL.trim() !== '' &&
  SUPABASE_ANON_KEY.trim() !== '' &&
  !SUPABASE_URL.includes('your url') &&
  !SUPABASE_ANON_KEY.includes('um just put the anon key vro');

export const supabase: SupabaseClient | null = hasValidConfig
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
