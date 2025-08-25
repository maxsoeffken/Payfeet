// /pages/feed.js
import { useEffect, useState } from 'react';
import RequireAuth from '../components/RequireAuth';
import { supabase } from '../lib/supabaseClient';

function timeAgo(d) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return `vor ${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `vor ${m} Min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `vor ${h} Std`;
  const dys = Math.floor(h / 24);
  return `vor ${dys} T`;
}

export default function FeedPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1) Session holen
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
  }, []);

  // 2) Posts laden
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      // holt neueste Posts + optional Profil
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          content,
          created_at,
          author_id,
          profiles!inner (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (!mounted) return;
      if (error) {
        console.error('Posts error:', error);
        setPosts([]);
      } else {
        setPosts(
          data.map((p) => ({
            id: p.id,
            text: p.content,
            time: p.created_at,
            author: p.profiles?.username || 'Payfeet',
            handle: '@' + (p.profiles?.username || 'payfeet'),
            avatar: p.profiles?.avatar_url || '/avatar.jpg', // später tauschen wir das Icon aus
          }))
        );
      }
      setLoading(false);
    })();

    return () => { mounted = false; };
  }, []);

  return (
    <RequireAuth>
      <main style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
        <h1 style={{ fontSize: 36, marginBottom: 12 }}>START</h1>

        {/* Composer (Platzhalter – später verdrahten) */}
        <div style={{
          background: '#fff', border: '1px solid #eee', borderRadius: 16,
          padding: 16, marginBottom: 16, boxShadow: '0 10px 30px rgba(0,0,0,.04)'
        }}>
          <div style={{ color: '#98a2b3' }}>Neuen Beitrag erstellen …</div>
        </div>

        {loading && <div style={{ padding: 24 }}>Lade Feed…</div>}

        {!loading && posts.map((p) => (
          <article key={p.id} style={{
            background: '#fff', border: '1px solid #eee', borderRadius: 16,
            padding: 16, marginBottom: 12, boxShadow: '0 10px 30px rgba(0,0,0,.04)'
          }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <img
                src={p.avatar}
                alt={p.author}
                width={44}
                height={44}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  <strong>{p.author}</strong>
                  <span style={{ color: '#98a2b3' }}>{p.handle}</span>
                  <span style={{ color: '#98a2b3' }}>· {timeAgo(p.time)}</span>
                </div>
                <p style={{ marginTop: 8, lineHeight: 1.5 }}>{p.text}</p>
              </div>
            </div>
          </article>
        ))}

        {/* BottomNav – kommt gleich im nächsten Schritt hübsch */}
      </main>
    </RequireAuth>
  );
}
