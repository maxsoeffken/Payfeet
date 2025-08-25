// /pages/feed.js
import { useEffect, useState } from 'react';
import RequireAuth from '../components/RequireAuth';      // <- relativ aus /pages
import { supabase } from '../lib/supabaseClient';         // <- richtiger Pfad
import Composer from '../components/Composer';            // <- kein "@/...", relativ

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Posts laden
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          content,
          created_at,
          author:profiles (
            id,
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setPosts(data ?? []);
      }
      setLoading(false);
    };

    load();
  }, []);

  // Neuer Post
  const handleCreate = async (text) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase.from('posts').insert({
      content: text,
      author_id: session.user.id,
    });

    if (error) {
      console.error(error);
      return;
    }

    // Nach dem Insert neu laden
    const { data } = await supabase
      .from('posts')
      .select(`
        id,
        content,
        created_at,
        author:profiles (
          id,
          username,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    setPosts(data ?? []);
  };

  return (
    <RequireAuth>
      <main style={{ maxWidth: 680, margin: '0 auto', padding: 16 }}>
        <h1 style={{ margin: '16px 0' }}>START</h1>

        {/* Composer */}
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: 12,
          boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
          marginBottom: 16
        }}>
          <Composer onCreate={handleCreate} />
        </div>

        {/* Feed */}
        {loading ? (
          <div>Lade Beiträge…</div>
        ) : posts.length === 0 ? (
          <div>Keine Beiträge vorhanden.</div>
        ) : (
          posts.map((p) => (
            <article
              key={p.id}
              style={{
                background: 'white',
                borderRadius: 16,
                padding: 16,
                boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                marginBottom: 16
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img
                  alt=""
                  src={p.author?.avatar_url || '/default-avatar.png'}
                  width={40}
                  height={40}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>
                    {p.author?.username || 'Payfeet'}
                  </div>
                  <div style={{ fontSize: 12, color: '#667085' }}>
                    {new Date(p.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
              <p style={{ marginTop: 12, lineHeight: 1.5 }}>{p.content}</p>
            </article>
          ))
        )}
      </main>
    </RequireAuth>
  );
}
