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

export default function PostCard({ post, forceUnlocked = false }) {
  const ago = post.created_at ? dayjs(post.created_at).fromNow() : '';
  const [me, setMe] = useState(null);
  const [subActive, setSubActive] = useState(false);
  const [unlocked, setUnlocked] = useState(!!forceUnlocked);
  const [buying, setBuying] = useState(false);

  // Login
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setMe(data?.user ?? null);
    });
    return () => { mounted = false; };
  }, []);

  // Abo-Status Creator
  useEffect(() => {
    let stop = false;
    (async () => {
      if (!me || !post.author_id) { setSubActive(false); return; }
      const { data } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('fan_id', me.id)
        .eq('creator_id', post.author_id)
        .maybeSingle();
      if (!stop) setSubActive(data?.status === 'active');
    })();
    return () => { stop = true; };
  }, [me, post.author_id]);

  // Entsperren je nach Visibility
  useEffect(() => {
    if (forceUnlocked) { setUnlocked(true); return; }
    let abort = false;

    const check = async () => {
      // Textpost immer frei
      if (!post.image_url) { setUnlocked(true); return; }

      // ABO entsperrt alles
      if (subActive) { setUnlocked(true); return; }

      // subscribers_only → ohne Abo bleibt gesperrt
      if (post.visibility === 'subscribers_only') { setUnlocked(false); return; }

      // ppv → Einzelkauf?
      if (post.visibility === 'ppv') {
        if (!me) { setUnlocked(false); return; }
        const { data: unlock } = await supabase
          .from('post_unlocks')
          .select('post_id')
          .eq('post_id', post.id)
          .eq('user_id', me.id)
          .maybeSingle();
        if (!abort) setUnlocked(!!unlock);
        return;
      }

      // public
      setUnlocked(true);
    };
    check();
    return () => { abort = true; };
  }, [me, post.id, post.image_url, post.visibility, subActive, forceUnlocked]);

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

  const priceLabel = (post.price_cents && post.price_cents >= 100)
    ? (post.price_cents/100).toFixed(2) + ' €'
    : '2,99 €';

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
          {subActive && <span className="chip chip--on" style={{marginLeft:8}}>Abo aktiv</span>}
          {post.visibility === 'ppv' && !subActive && <span className="chip" style={{marginLeft:8}}>PPV</span>}
          {post.visibility === 'subscribers_only' && !subActive && <span className="chip" style={{marginLeft:8}}>Nur Abonnenten</span>}
        </header>

        {post.content && <p className="post__text">{post.content}</p>}

        {post.image_url && (
          <div className={`post__image ${unlocked ? '' : 'blurred'}`}>
            <img src={post.image_url} alt="" />
            {/* Overlay-Logik */}
            {!unlocked && (
              <div className="overlay">
                {post.visibility === 'ppv' ? (
                  <button className="btn primary" onClick={buy} disabled={buying}>
                    {buying ? 'Weiter…' : `Freischalten – ${priceLabel}`}
                  </button>
                ) : post.visibility === 'subscribers_only' ? (
                  <a className="btn primary" href={`/u/${encodeURIComponent(post.author_username || '')}`}>Abo abschließen</a>
                ) : null}
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
