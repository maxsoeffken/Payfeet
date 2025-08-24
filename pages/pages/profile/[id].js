// pages/profile/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

export default function CreatorProfilePage() {
  const router = useRouter();
  const { id } = router.query; // Creator-ID (uuid)
  const [me, setMe] = useState(null);
  const [creator, setCreator] = useState(null);
  const [posts, setPosts] = useState([]);
  const [bought, setBought] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Basisdaten laden
  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);

      // eingeloggter User
      const meRes = await supabase.auth.getUser();
      const user = meRes.data.user || null;
      setMe(user);

      // Profil (profiles)
      const { data: prof } = await supabase
        .from('profiles')
        .select('id, username, name, bio, avatar_url')
        .eq('id', id)
        .single();
      setCreator(prof || null);

      // Posts des Creators
      const { data: creatorPosts } = await supabase
        .from('posts')
        .select('id, title, media_url, created_at, creator_id')
        .eq('creator_id', id)
        .order('created_at', { ascending: false });
      setPosts(creatorPosts || []);

      // Gekaufte Posts dieses Users (für Blur/Unlock)
      if (user) {
        const { data: my } = await supabase
          .from('purchases')
          .select('post_id')
          .eq('user_id', user.id);
        setBought(new Set((my || []).map((x) => x.post_id)));
      } else {
        setBought(new Set());
      }

      setLoading(false);
    })();
  }, [id]);

  async function buy(postId) {
    if (!me) return router.push('/login');
    const res = await fetch('/api/pay/ppv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, userId: me.id })
    });
    const json = await res.json();
    if (json.url) window.location.href = json.url;
  }

  if (loading) return <div className="card" style={{ padding: 20 }}>Lade…</div>;
  if (!creator) return (
    <div className="card" style={{ padding: 20 }}>
      <p>Creator nicht gefunden.</p>
      <Link href="/feed" className="btn btn-light">Zurück zum Feed</Link>
    </div>
  );

  return (
    <div className="card" style={{ padding: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
        <img
          src={creator.avatar_url || '/favicon.ico'}
          alt=""
          width={72}
          height={72}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <h2 style={{ margin: '0 0 4px' }}>
            @{creator.username || String(creator.id).slice(0, 8)}
          </h2>
          <div style={{ color: '#6b7280' }}>{creator.name || ''}</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Link href="/feed" className="btn btn-light">← Zurück</Link>
        </div>
      </div>

      {creator.bio && (
        <p style={{ whiteSpace: 'pre-wrap', marginTop: 0 }}>{creator.bio}</p>
      )}

      {/* Posts-Grid */}
      <h3 style={{ marginTop: 24 }}>Posts</h3>
      {posts.length === 0 ? (
        <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 10 }}>
          Noch keine Posts.
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
            gap: 12
          }}
        >
          {posts.map((p) => {
            const unlocked = bought.has(p.id) || me?.id === p.creator_id;
            return (
              <div key={p.id} className="card" style={{ padding: 8 }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>
                  {p.title || `Post #${p.id}`}
                </div>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
                  <img
                    src={p.media_url}
                    alt=""
                    style={{
                      width: '100%',
                      display: 'block',
                      filter: unlocked ? 'none' : 'blur(18px)',
                      transform: unlocked ? 'none' : 'scale(1.05)'
                    }}
                  />
                  {!unlocked && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.25)'
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        onClick={() => buy(p.id)}
                      >
                        Freischalten – 2,99 €
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
