import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // nur serverseitig nutzen!
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Nur GET erlaubt' });
  }

  const { q } = req.query; // ?q=Suchbegriff
  if (!q || q.length < 2) {
    return res.status(400).json({ error: 'Mindestens 2 Zeichen eingeben' });
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name')
      .ilike('name', `%${q}%`);

    if (error) throw error;

    return res.status(200).json({ users: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
