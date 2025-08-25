// components/PostCard.js
'use client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/de';
import LikeButton from './LikeButton';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
dayjs.extend(relativeTime);
dayjs.locale('de');

export default function PostCard({ post }) {
  const ago = post.created_at ? dayjs(post.created_at).fromNow() : '';
  const [me, setMe] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      setMe(user ?? null);

      if (user && post.image_url) {
        // prüfen, ob freigeschaltet
        const { data } = await supabase
          .from('post_unlocks')
          .select('post_id')
          .eq('post_id', post.id)
          .eq('user_id', user.id)
          .maybeSingle();
        setUnlocked(!!data);
      } else {
        // Textposts sind immer sichtbar
        setUnlocked(true);
      }
    })();
    return () => { mounted = false; };
  }, [post.id, post.image_url]);

  const buy = async () => {
    if (!me) return alert('Bitte einloggen.');
    setBuying(true);
    const res = await fetch('/api/pay/ppv', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ postId: post.id, userId: me.id, creatorId: post.author_id || '' })
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
