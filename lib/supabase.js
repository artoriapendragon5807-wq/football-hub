import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://trldioaleqfsfkgssrbj.supabase.co';
const supabaseKey = 'sb_publishable_dlIMJs6ynwTOwf-M73wW7w_v2wRLRN6';

export const supabase = createClient(supabaseUrl, supabaseKey);