// pages/api/search/users.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // nur Server
);

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });
  const q = (req.query.q || '').toString();
  if (q.length < 2) return res.status(400).json({ error: 'Mind. 2 Zeichen' });

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, bio, is_creator, monthly_price_cents')
    .or(`username.ilike.%${q}%,bio.ilike.%${q}%`)
    .order('username', { ascending: true })
    .limit(25);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ users: data || [] });
}
