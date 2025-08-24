// pages/feed.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Feed() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    supabase.auth.getSession().then(({ data }) => {
      if (ignore) return;
      if (!data?.session) {
        router.replace('/login');
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_e, session) => {
        if (ignore) return;
        if (!session) router.replace('/login');
      });

    return () => {
      ignore = true;
      subscription?.unsubscribe();
    };
  }, [router]);

  if (loading) return null; // während Weiterleitungscheck nichts rendern

  return (
    <div style={{ maxWidth: 860, margin: '40px auto', padding: 16 }}>
      <h1>Feed</h1>
      <p>🎉 Eingeloggt – hier kommt dein Content.</p>
    </div>
  );
}
