// components/PostCard.js
'use client';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/de';
import { supabase } from '../lib/supabaseClient';
import LikeButton from './LikeButton';

dayjs.extend(relativeTime);
dayjs.locale('de');

export default function PostCard({ post }) {
  const ago = post.created_at ? dayjs(post.created_at).fromNow() : '';
  const [me, setMe] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [buying, setBuying] = useState(false);

  // Prüfe Login
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setMe(data?.user ?? null);
    });
    return () => { mounted = false; };
  }, []);

  // Entsperr-Logik:
  // 1) kein Bild => immer frei
  // 2) aktives Abo (subscriptions) => frei
  // 3) PPV-Freischaltung (post_unlocks) => frei
  useEffect(() => {
    let abort = false;
    const check = async () => {
      if (!post.image_url) { setUnlocked(true); return; }   // nur Textpost
      if (!me) { setUnlocked(false); return; }              // nicht eingeloggt => geblurrt

      // 2) Abo aktiv?
      if (post.author_id) {
        const { data: sub, error: subErr } = await supabase
          .from('subscriptions')
          .select('status')
          .eq('fan_id', me.id)
          .eq('creator_id', post.author_id)
          .maybeSingle();

        if (!abort && sub && sub.status === 'active') {
          setUnlocked(true);
          return;
        }
      }

      // 3) Einzelkauf (PPV) vorhanden?
      const { data: unlock, error: uErr } = await supabase
        .from('post_unlocks')
        .select('post_id')
        .eq('post_id', post.id)
        .eq('user_id', me.id)
        .maybeSingle();

      if (!abort) setUnlocked(!!unlock);
    };
    check();
    return () => { abort = true; };
  }, [me, post.id, post.author_id, post.image_url]);

  const buy = async () => {
    if (!me) return alert('Bitte einloggen.');
    setBuying(true);
    const res = await fetch('/api/pay/ppv', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({
        postId: post.id,
        userId: me.id,
        creatorId: post.author_id || ''
      })
    });
    setBuying(false);
    const j = await res.json();
    if (j?.url) window.location.href = j.url;
    else alert(j?.error || 'Checkout fehlgeschlagen.');
  };

  return (
    <article className="post glass">
      <div className="post__avatar">
        <img src={post.author_avatar || '/payfeet-logo.png'} alt="" />
      </div>

      <div className="post__body">
        <header className="post__meta">
          <strong>{post.author_username || 'Payfeet User'}</strong>
          <span className="handle">@{(post.author_username || 'user').toLowerCase()}</span>
          <span className="dot">·</span>
          <time>{ago}</time>
        </header>

        {post.content && <p className="post__text">{post.content}</p>}

        {post.image_url && (
          <div className={`post__image ${unlocked ? '' : 'blurred'}`}>
            <img src={post.image_url} alt="" />
            {!unlocked && (
              <div className="overlay">
                <button className="btn primary" onClick={buy} disabled={buying}>
                  {buying ? 'Weiter…' : 'Freischalten – 2,99 €'}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="post__actions">
          <LikeButton postId={post.id} />
        </div>
      </div>
    </article>
  );
}
