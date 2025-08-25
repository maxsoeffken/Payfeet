// components/LikeButton.js
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function LikeButton({ postId }) {
  const [me, setMe] = useState(null);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      setMe(user ?? null);

      // Likes zählen
      const { data: agg } = await supabase
        .from('post_likes')
        .select('post_id', { count: 'exact', head: true })
        .eq('post_id', postId);
      setCount(agg?.length === 0 ? 0 : agg?.[0]?.count ?? 0); // Fallback

      // ob ich geliked habe
      if (user) {
        const { data: mine } = await supabase
          .from('post_likes')
          .select('post_id')
          .eq('post_id', postId)
          .eq('user_id', user.id)
          .maybeSingle();
        setLiked(!!mine);
      }
    };
    load();

    // Realtime optional (vereinfachen wir: neu laden on demand)
    return () => { mounted = false; };
  }, [postId]);

  const toggle = async () => {
    if (!me || busy) return;
    setBusy(true);
    if (!liked) {
      const { error } = await supabase
        .from('post_likes')
        .insert({ post_id: postId, user_id: me.id });
      if (!error) { setLiked(true); setCount((c) => c + 1); }
    } else {
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', me.id);
      if (!error) { setLiked(false); setCount((c) => Math.max(0, c - 1)); }
    }
    setBusy(false);
  };

  return (
    <button className={`chip ${liked ? 'chip--on' : ''}`} onClick={toggle} disabled={busy}>
      ♥ {count}
    </button>
  );
}
