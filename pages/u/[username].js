// pages/u/[username].js
'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
import { supabase } from '../../lib/supabaseClient';

export default function CreatorPage() {
  const router = useRouter();
  const username = (router.query.username || '').toString();
  const [creator, setCreator] = useState(null);
  const [posts, setPosts] = useState([]);
  const [me, setMe] = useState(null);
  const [subActive, setSubActive] = useState(false);
  const price = useMemo(() => creator?.monthly_price_cents || null, [creator]);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setMe(user ?? null);
    })();
  }, []);

  useEffect(() => {
    if (!username) return;
    (async () => {
      const { data: prof } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, bio, is_creator, monthly_price_cents')
        .eq('username', username)
        .maybeSingle();
      setCreator(prof || null);

      if (prof) {
        const { data: postsData } = await supabase
          .from('posts')
          .select('id, content, image_url, author_id, created_at')
          .eq('author_id', prof.id)
          .order('created_at', { ascending: false });
        setPosts(postsData || []);
      }
    })();
  }, [username]);

  useEffect(() => {
    if (!me || !creator) return;
    (async () => {
      const { data: subs } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('fan_id', me.id)
        .eq('creator_id', creator.id)
        .maybeSingle();
      setSubActive(subs?.status === 'active');
    })();
  }, [me, creator]);

  const subscribe = async () => {
    if (!me || !creator) return alert('Bitte einloggen.');
    if (!price) return alert('Creator hat noch keinen Preis gesetzt.');
    const res = await fetch('/api/subscribe/create-session', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        creatorId: creator.id,
        creatorUsername: creator.username,
        fanId: me.id,
        priceCents: price
      })
    });
    const j = await res.json();
    if (j?.url) window.location.href = j.url;
    else alert(j?.error || 'Checkout fehlgeschlagen.');
  };

  return (
    <Layout title={`@${username} – Payfeet`}>
      {!creator ? (
        <div className="glass" style={{padding:16}}>Creator nicht gefunden.</div>
      ) : (
        <>
          <section className="glass" style={{padding:16, display:'grid', gap:12}}>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <img src={creator.avatar_url || '/payfeet-logo.png'} alt="" style={{width:64, height:64, borderRadius:'50%'}} />
              <div>
                <h2 style={{margin:0}}>@{creator.username}</h2>
                <div style={{opacity:.8}}>{creator.bio || '—'}</div>
              </div>
              <div style={{marginLeft:'auto'}}>
                {creator.is_creator && price ? (
                  subActive ? (
                    <span className="chip chip--on">Abo aktiv</span>
                  ) : (
                    <button className="btn primary" onClick={subscribe}>
                      Abo {(price/100).toFixed(2)}€ / Monat
                    </button>
                  )
                ) : (
                  <span className="chip">Kein Abo verfügbar</span>
                )}
              </div>
            </div>
          </section>

          <div className="feedList" style={{marginTop:12}}>
            {posts.map(p => (
              <PostCard
                key={p.id}
                forceUnlocked={subActive}          // <<<<< HIER
                post={{
                  id: p.id,
                  content: p.content,
                  image_url: p.image_url,
                  created_at: p.created_at,
                  author_id: p.author_id,
                  author_username: creator.username,
                  author_avatar: creator.avatar_url
                }}
              />
            ))}
            {posts.length===0 && <div className="glass" style={{padding:16}}>Noch keine Beiträge.</div>}
          </div>
        </>
      )}
    </Layout>
  );
}
