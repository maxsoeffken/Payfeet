// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let ignore = false;

    supabase.auth.getSession().then(({ data }) => {
      if (ignore) return;
      if (data?.session) {
        router.replace('/feed');
      } else {
        router.replace('/login');
      }
    });

    // falls sich der Auth-Status ändert (z. B. direkt nach Login)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (ignore) return;
      router.replace(session ? '/feed' : '/login');
    });

    return () => {
      ignore = true;
      subscription?.unsubscribe();
    };
  }, [router]);

  // Nichts rendern, weil wir sofort weiterleiten
  return null;
}
