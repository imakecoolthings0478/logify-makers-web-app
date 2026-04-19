import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './constants';

const hasValidConfig =
  SUPABASE_URL.trim() !== '' &&
  SUPABASE_ANON_KEY.trim() !== '' &&
  !SUPABASE_URL.includes('https://ffstxuvdcccnlzzyirpg.supabase.co') &&
  !SUPABASE_ANON_KEY.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc3R4dXZkY2Njbmx6enlpcnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NjkzNTAsImV4cCI6MjA5MjE0NTM1MH0.fr3usXCJBfofzgt6ZLd2HJum6l9ww4OpwHVw9ZkMytY');

export const supabase: SupabaseClient | null = hasValidConfig
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
