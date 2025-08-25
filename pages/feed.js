// pages/feed.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layout';
import Composer from '../components/Composer';
import PostCard from '../components/PostCard';

export default function FeedPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) router.replace('/');
      else setReady(true);
    });
    return () => { mounted = false; };
  }, [router]);

  useEffect(() => {
    if (!ready) return;
    const load = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id, content, image_url, author_id, created_at, visibility, price_cents,
          profiles!posts_author_id_fkey ( username, avatar_url )
        `)
        .order('created_at', { ascending: false });

      if (!error) {
        setPosts((data||[]).map(p => ({
          id: p.id,
          content: p.content,
          image_url: p.image_url,
          created_at: p.created_at,
          author_id: p.author_id,
          visibility: p.visibility,
          price_cents: p.price_cents,
          author_username: p.profiles?.username,
          author_avatar: p.profiles?.avatar_url
        })));
      }
    };

    load();

    const channel = supabase
      .channel('posts-feed')
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'posts' }, ({ new: row }) => {
        setPosts(prev => [{
          id: row.id,
          content: row.content,
          image_url: row.image_url,
          created_at: row.created_at,
          author_id: row.author_id,
          visibility: row.visibility,
          price_cents: row.price_cents
        }, ...prev]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [ready]);

  if (!ready) return null;

  return (
    <Layout title="Feed – Payfeet">
      <h2 className="pageTitle">START</h2>
      <Composer onCreated={() => {}} />
      <div className="feedList">
        {posts.map(p => <PostCard key={p.id} post={p} />)}
        {posts.length===0 && <div className="empty glass">Noch keine Beiträge – leg los 🎉</div>}
      </div>
    </Layout>
  );
}
