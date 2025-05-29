import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env._SUPABASE_URL!,
  process.env._SUPABASE_ANON_KEY!
)
