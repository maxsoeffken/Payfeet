// pages/feed.js
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

import RequireAuth from '../components/RequireAuth';
import Shell from '../components/Shell';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import Composer from '../components/Composer';
import FeedCard from '../components/FeedCard';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setErr(null);

    // Holt Posts + Autor (Join auf profiles über author_id)
    // Wichtig: In deinem Schema gibt es die FK posts.author_id -> profiles.id
    // Der Alias "author" macht es im UI einfacher
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        content,
        created_at,
        author:profiles!posts_author_id_fkey (
          id,
          username,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      setErr(error.message || 'Fehler beim Laden der Posts');
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Wenn dein Composer einen neuen Post erstellt, Feed nachladen
  const handlePostCreated = () => loadPosts();

  return (
    <RequireAuth>
      <Shell>
        <TopNav title="START" />

        <main style={{ maxWidth: 720, margin: '0 auto', padding: '0 16px 96px' }}>
          {/* Composer */}
          <section style={{ marginTop: 16, marginBottom: 20 }}>
            {/* Wenn dein Composer bereits existiert, reicht das Callback */}
            <Composer onCreated={handlePostCreated} />
          </section>

          {/* Status */}
          {loading && (
            <p style={{ opacity: 0.7, padding: '8px 4px' }}>Lade Beiträge…</p>
          )}
          {err && (
            <p style={{ color: 'crimson', padding: '8px 4px' }}>
              {err}
            </p>
          )}

          {/* Liste */}
          {posts.map((p) => (
            <FeedCard
              key={p.id}
              author={{
                id: p.author?.id ?? null,
                name: p.author?.username ?? 'Unbekannt',
                handle: p.author?.username ? `@${p.author.username}` : '@user',
                avatarUrl: p.author?.avatar_url || null,
              }}
              createdAt={p.created_at}
              text={p.content}
            />
          ))}

          {/* Keine Posts */}
          {!loading && posts.length === 0 && !err && (
            <p style={{ opacity: 0.7, padding: '8px 4px' }}>
              Noch keine Beiträge – schreib den ersten! ✍️
            </p>
          )}
        </main>

        <BottomNav />
      </Shell>
    </RequireAuth>
  );
}
