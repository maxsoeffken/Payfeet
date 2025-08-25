// /lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anon) {
  // Hilft beim Debuggen (erscheint in Vercel-Logs)
  console.warn('Supabase ENV Variablen fehlen (URL/ANON KEY).');
}

export const supabase = createClient(url, anon, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
